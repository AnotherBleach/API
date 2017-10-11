# API
life.js 生命周期管理主模块，目前是采用json文件存储API信息的，同样在里面也包含了健康检查的内容。
动态路由里面router.js，目前实现的简单路由
例如访问：http://localhost:8081/?type=呼叫控制&userPhone=xxxxxxxxxx
会判断出属于呼叫控制类API，查询数据库得到userPhone的所属信息。
