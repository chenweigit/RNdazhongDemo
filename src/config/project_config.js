/* 当前开发模式 */
const isPro = false;   // isPro

const host = {
    dev:"http://pay.7c6nn.com",
    pro:""
}

const urlVersion = "4.4.3";

const fetchHost = isPro?host.pro:host.dev;

export  {fetchHost,urlVersion}