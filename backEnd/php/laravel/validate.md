# 表单验证

### 1. 创建验证器

```php
// 用于 添加用户接口的数据验证
php artisan make:request StoreUser
```

### 2. 编写验证器

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * 判断用户是否有权限进行此请求
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            'email' => 'required|email|unique:users,email|max:255',
            'name' => 'required|max:255|unique:users,name',
            'password' => 'required|max:32',
        ];
    }
}

```

### 3.在控制器中使用表单验证器

```php

// 最终不符合要求直接回返回422 以及相关错误信息
public function store(StoreUser $request)
    {
        $newUser = [
            'email' => $request->input('email'),
            'name' => $request->input('name'),
            'password' => bcrypt($request->input('password'))
        ];

        \DB::beginTransaction();
        try{
            $user = $this->user->create($newUser);
            $this->updateUserRoles($request['roles'], $user);
            \DB::commit();
            return $this->response->created();
        }catch (\Exception $e) {
            \DB::rollBack();
            \Log::error('用户创建失败');
            return $this->createError();
        }
    }
```

### 参考文章

[表单验证](https://learnku.com/docs/laravel/6.x/validation/5144)