# OAuth2

> Laravel 官方扩展包 Laravel Passport 让 API 认证变得轻而易举. 
> 其有四种模式，对应多种场景

## passport 配置

### 1. 安装

```
php artisan passport:install

```

### 2. 修改用户模型

```
use HasApiTokens

```


### 3. 修改授权服务 为其注入路由


```php
 public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }

```

### 4. 修改 config/api.php

> 为api 选择授权的驱动

```php
'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],

```
> 获取采用中间件方式，动态修改配置

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Config;

class PassportMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Config::set('auth.guards.api.driver', 'passport');
        $request->headers->set('accept', 'application/json');
//        Config::set('auth.defaults.guard', 'api');
        return $next($request);
    }
}

```


## 密码模式

> 自己系统中的用户登录

### 1. 相关路由

```php
$api->version('v1', [
    'namespace' => 'App\Http\Controllers\Api\V1',
    'middleware' => 'passport-auth'
], function ($api) {
    // 登录
    $api->group(['prefix' => 'passport'], function ($api) {

        $api->post('login', ['uses' => 'PasssportController@login', 'description' => "用户登陆"]);
        $api->post('refresh', 'PasssportController@refresh');

        $api->group(['middleware' => ['auth:api']], function ($api) {
            $api->post('logout', 'PasssportController@logout');
            $api->post('me', 'PasssportController@me');
        });
    });

});

```

### 2.实现控制器

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\ErrorMessage;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PasssportController extends Controller
{
    //
    public function login(Request $request)
    {
        // 校验账号是由存在
        $validator = \Validator::make(request()->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->errorBadRequest($validator);
        }
        try {
            $response = app(Client::class)->post(url('/oauth/token'), [
                'form_params' => [
                    'grant_type' => 'password',
                    // 使用的 oauth_clients 中的 id=2的客户端即可
                    'client_id' => config('passport.clients.password.client_id'),
                    'client_secret' => config('passport.clients.password.client_secret'),
                    'username' => $request->get('email'),
                    'password' => $request->get('password'),
                    'scope' => '*',
                ],
            ]);
            return json_decode((string)$response->getBody(), true);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(ErrorMessage::getMessage(ErrorMessage::PASSWORD_OR_NAME_ERROR), 400);
        }
    }

    public function me(Request $request)
    {
        $user = \Auth::user();
        return response()->json($user);
    }

    public function refresh(Request $request)
    {
        $validator = \Validator::make(request()->all(), [
            'refresh_token' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->errorBadRequest($validator);
        }
        $refresh_token = $request->get('refresh_token');
        try {
            $response = app(Client::class)->post(url('/oauth/token'), [
                'form_params' => [
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $refresh_token,
                    'client_id' => config('passport.clients.password.client_id'),
                    'client_secret' => config('passport.clients.password.client_secret'),
                    'scope' => '',
                ],
            ]);
        } catch (\Exception $e) {
            \Log::info($e->getMessage());
            return response()->json(ErrorMessage::getMessage(ErrorMessage::PASSPORT_REFRESH_ERROR), 401);
        }

        // 清空 使用的记录
//        DB::table('oauth_refresh_tokens')->where('revoked', '=', 1)->delete();
        return json_decode((string)$response->getBody(), true);
    }

    public function logout(){
        if (\Auth::guard('api')->check()) {
            $access_token = \Auth::guard('api')->user()->token();
            $access_token_id = $access_token->toArray()['id'];

            $access_token->delete();
            DB::table('oauth_refresh_tokens')->where('access_token_id', '=', $access_token_id)->delete();
        }
        return $this->success();
    }
}

```

## 三方客户端授权登录

> 最终效果描述：别的系统登录该系统提供的服务后；三方系统的指定接口会得到当前登录用户的access_token 

### 1. 路由

```php
Route::get('/auth', 'Auth\LoginController@oauth');
Route::get('/auth/callback', 'Auth\LoginController@callback');

Route::get('/auth/client', 'Auth\LoginController@client');
```


### 2. 实现

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }


    public function oauth()
    {

        $query = http_build_query([
            'client_id' => config('services.blog.appid'),
            'redirect_uri' => config('services.blog.callback'),
            'response_type' => 'code',
            'scope' => '',
        ]);

        return redirect('http://192.168.50.179:280/oauth/authorize?'.$query);
    }

    public function callback(Request $request)
    {
        $code = $request->get('code');
        if (!$code) {
            dd('授权失败');
        }
        $http = new \GuzzleHttp\Client();
//        docker 环境
        try {
            $response = $http->post('http://192.168.50.179:280/oauth/token', [
                'form_params' => [
                    'grant_type' => 'authorization_code',
                    'client_id' => config('services.blog.appid'),  // your client id
                    'client_secret' => config('services.blog.secret'),   // your client secret
                    'redirect_uri' => config('services.blog.callback'),
                    'code' => $code,
                ],
            ]);
            \Log::info($response->getBody());
            return $response->getBody();
        }catch (\Exception $e) {
            return response()->json(\App\Exceptions\ErrorMessage::getMessage(\App\Exceptions\ErrorMessage::AUTHORIZATION_CODE_ERROR), 400);
        }
    }

    public function client()
    {
        $http = new \GuzzleHttp\Client();
        $response = $http->post('http://192.168.50.179:280/oauth/token', [
            'form_params' => [
                'grant_type' => 'client_credentials',
                'client_id' => config('services.blog.appid'),  // your client id
                'client_secret' => config('services.blog.secret'),   // your client secret
                'scope' => '*'
            ],
        ]);

        return response($response->getBody());
    }
}

```
















## 参考文档

> [Laravel Passport 学习整理](https://learnku.com/articles/6404/laravel-passport-learning-finishing)




