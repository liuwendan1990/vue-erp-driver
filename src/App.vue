<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
html {
    font-family: sans-serif;
    /* -webkit-text-size-adjust: 100%; */
}
body {
    font-family: 'Helvetica Neue',Helvetica,sans-serif;
    font-size: 17px;
    line-height: 21px;
    color: #000;
    background-color: #efeff4;
    -webkit-overflow-scrolling: touch;
}
.van-nav-bar~.content{
  padding-top: 46px;
}
.content { 
    background-color: #efeff4;
    -webkit-overflow-scrolling: touch;
}


.panel-card {
    font-size: 14px;
    line-height: 1.4;
    position: relative;
    overflow: hidden;
    margin: 10px;
    border-radius: 2px;
    background-color: #fff;
    background-clip: padding-box;
    box-shadow: 0 1px 2px rgba(0,0,0,.3);
}
.panel-table-view {
    position: relative;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    background-color: #fff;
}

.panel-table-view-cell {
    position: relative;
    overflow: hidden;
    padding: 11px 15px;
    -webkit-touch-callout: none;
}

.panel-card .panel-table-view {
    margin-bottom: 0;
    border-top: 0;
    border-bottom: 0;
    border-radius: 6px;
}
.panel-card .panel-table-view .panel-table-view-cell:first-child{
    top: 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.panel-table-view-cell span {
    float: left;
}
.panel-table-view-cell .list-label {
    width: 35%;
    font-weight: bold;
}
.panel-table-view-cell .list-con {
    width: 65%;
}
</style>
