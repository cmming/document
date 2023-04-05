# 环境

> laravel 6.2  + laravel-echo-server 1.6


### 1. 修改 config/app.php

> 打开广播服务

```
  App\Providers\BroadcastServiceProvider::class,
```


### 2. 修改 BroadcastServiceProvider 中

```php

// 广播路由
//Broadcast::routes();

// 由于使用的 jwt-auth，所有为广播添加授权的中间件。方便后面laravel-echo-server服务授权
Config::set('auth.guards.api.driver', 'jwt');
Config::set('auth.defaults.guard', 'api');
Broadcast::routes(["prefix" => "api", "middleware" => ['api', 'jwt.auth']]);
```


### 3. 创建事件

```sh
php artisan make:event LoginRemind
```


```php
<?php

namespace App\Events;

use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class LoginRemind implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $user;


    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        //
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        \Log::info('login.remind.'.$this->user->id);
        return new PrivateChannel('login.remind.'.$this->user->id);
//        return new Channel('login-remind');
    }

    public function broadcastWith()
    {
        return ['message' => '测试消息'];
    }
}


// 使用 
event(new LoginRemind(auth()->user()));
```


### 4. 修改配置文件 

```
// .env 
BROADCAST_DRIVER=redis
QUEUE_CONNECTION=redis

// config/database.php 
'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            // 频道会自动加前缀 导致频道名称变了
//            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
        ],
```


### 5. 启动 laravel-echo-server

1. 使用laradock启动，修改配置文件（laravel-echo-server.json）

```json
{
    // 采用的docker 直接写服务的名称即可；采用内网通信
    "authHost": "http://nginx",
    // 由于在 BroadcastServiceProvider 为所有的广播路由使用了中间件
	"authEndpoint": "/api/broadcasting/auth",
	"clients": [],
	"database": "redis",
	"databaseConfig": {
		"redis": {
			"port": "6379",
			"host": "redis"
		}
	},
	"devMode": true,
	"host": null,
	"port": "6001",
	"protocol": "http",
	"socketio": {},
	"sslCertPath": "",
	"sslKeyPath": "",
}
```

2. 启动服务

```sh
//启动
docker-compse up -d laravel-echo-server
//修改了配置 重新构建；然后重启服务
docker-compse build laravel-echo-server
```


### 6. 启动任务队列监听

```
// 进入workspace

php artisan queue:listen
```

