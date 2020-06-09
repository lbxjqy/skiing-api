/*
 * @Author: your name
 * @Date: 2020-06-07 22:00:28
 * @LastEditTime: 2020-06-07 22:02:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /egg/Users/linboxuan/vscodeProjects/demo/express-demo/data_helper/sqlHelper.js
 */
/**
 * Created by Administrator on 2016/12/26.
 */
var Sequelize = require('sequelize');
var DataBase = require('../config').DataBase;
/**
 * 根据配置文件加载运行参数
 */

function SqlHelper() {
    this.sequelize = null;
}
SqlHelper.prototype.init = function(callback) {
    callback = callback || function() {};
    this.sequelize = new Sequelize(DataBase.DBName, DataBase.UserName, DataBase.PWD, {
        host: DataBase.Host,
        port: DataBase.Port,
        dialect: DataBase.DBType,
        pool: {
            max: DataBase.PoolMAX,
            min: DataBase.PoolMIN,
            idle: 10000
        },
        timezone: DataBase.timezone

        // // SQLite only
        // storage: 'path/to/database.sqlite'
    });
    callback(0, "OK");
}

module.exports = new SqlHelper();