copy.sh 是一个拷贝日志的脚本
但要定时执行的话 需要再linux下或者mocos下
有一个叫crontab定时任务的东西

crontab -e 打开编辑器
按照 ***** commond(命令是绝对路径)
* 0 * * * * sh C:/Users/wb-yfj580379/Desktop/nodelearning/blog1/src/utils/copy.sh
每天的0点去执行这个脚本

crontab -l查看当前crontab上的任务列表