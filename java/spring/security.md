## 作用
Spring Security 是一个功能强大且高度可定制的**身份验证**和**访问控制**框架。它是保护基于 Spring 的应用程序的事实标准。(就是用来登录和角色权限控制的)

### 1. 身份验证

验证用户的常用方法是要求用户输入用户名和密码。

#### 1.1 PasswordEncoder (密码编译器)

用于密码的**单向**加密，保证密码的安全存储。

#### 1.2 DelegatingPasswordEncoder（委托类）

为了避免使用莫一种特定算法的编码器所带来后期升级db的麻烦，可以使用委托类，它可以根据不同的算法来选择不同的编码器。

 1. 确保使用当前密码存储建议对密码进行编码
 2. 能同时验证新旧密码
 3. 自动升级密码的编码器 （重写了upgradeEncoding，如果历史的加密模式和新的不等，修改成true。DaoAuthenticationProvider中createSuccessAuthentication根据upgradeEncoding自动更新密码的加加密编码）

存储格式为
```
{编码器id}加密后的密码
```

#### 1.3 AuthorizationServerConfigurerAdapter (认证服务器配置)

1. 配置token的服务 DefaultTokenServices
2. 配置授权服务器端点的属性和增强功能  AuthorizationServerEndpointsConfigurer
3. 配置oauth2客户端的信息 ClientDetailsServiceConfigurer，实现ClientDetailsService接口

#### 1.4 WebSecurityConfigurerAdapter (Web安全配置器)

用于配置基于session方式的接口和页面安全。（如果系统是通过session控制登录权限）

### 2. oauth2

#### 2.1 AuthorizationServerConfiguration（授权服务器配置）

通过实现AuthorizationServerConfiguration接口来实现自定义的授权服务器配置。该配置用于接口权限控制。


### 3. 自定义授权模式

自定义授权的时候的参数，方便添加验证码、短信、微信整合等操作。



### 4. 多用户体系


