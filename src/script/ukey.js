var bConnect = 0;

function load() {
	//如果是IE10及以下浏览器，则跳过不处理，
	if (navigator.userAgent.indexOf("MSIE") > 0 && !navigator.userAgent.indexOf("opera") > -1) return;
	try {
		var s_pnp = new SoftKey6W();
		s_pnp.Socket_UK.onopen = function () {
			bConnect = 1;//代表已经连接，用于判断是否安装了客户端服务
		}
		if(bConnect==0){
			// 提示用户未安装驱动
		}
		//在使用事件插拨时，注意，一定不要关掉Sockey，否则无法监测事件插拨
		s_pnp.Socket_UK.onmessage = function got_packet(Msg) {
			var PnpData = JSON.parse(Msg.data);
			if (PnpData.type == "PnpEvent")//如果是插拨事件处理消息
			{
				if (PnpData.IsIn) {
				} 
				else {
					// layer.msg('U盾已被拔出，为了信息安全考虑，请插入U盾进行操作。');
					window.location.href='https://aijuhr.com/dist/#/';
				}
			}
		}
		

		s_pnp.Socket_UK.onclose = function () {

		}
	}
	catch (e) {
		console.log()
		return false;
	}
}

var digitArray = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

function toHex(n) {

	var result = ''
	var start = true;

	for (var i = 32; i > 0;) {
		i -= 4;
		var digit = (n >> i) & 0xf;

		if (!start || digit != 0) {
			start = false;
			result += digitArray[digit];
		}
	}

	return (result == '' ? '0' : result);
}
function login_onclick(cb) {
	//如果是IE10及以下浏览器，则使用AVCTIVEX控件的方式
	if (navigator.userAgent.indexOf("MSIE") > 0 && !navigator.userAgent.indexOf("opera") > -1) return Handle_IE10();

	//判断是否安装了服务程序，如果没有安装提示用户安装
	if (bConnect == 0) {
		cb(bConnect)
		console.log("未能连接服务程序，请确定服务程序是否安装。"); return false;
	}
	try {
		var DevicePath, mylen, ret, keyid, username, mykey, outstring, address, mydata, i, InString, versionex, version, seed;
		var ProduceDate, macAddr;


		//由于是使用事件消息的方式与服务程序进行通讯，
		//好处是不用安装插件，不分系统及版本，控件也不会被拦截，同时安装服务程序后，可以立即使用，不用重启浏览器
		//不好的地方，就是但写代码会复杂一些
		var s_simnew1 = new SoftKey6W(); //创建UK类

		s_simnew1.Socket_UK.onopen = function () {
			s_simnew1.ResetOrder();//这里调用ResetOrder将计数清零，这样，消息处理处就会收到0序号的消息，通过计数及序号的方式，从而生产流程
		}

		//写代码时一定要注意，每调用我们的一个UKEY函数，就会生产一个计数，即增加一个序号，较好的逻辑是一个序号的消息处理中，只调用我们一个UKEY的函数
		s_simnew1.Socket_UK.onmessage = function got_packet(Msg) {
			var UK_Data = JSON.parse(Msg.data);
			if (UK_Data.type != "Process") return;//如果不是流程处理消息，则跳过
			//alert(Msg.data);
			switch (UK_Data.order) {
				case 0:
					{
						s_simnew1.FindPort(0);//查找加密锁
					}
					break;//!!!!!重要提示，如果在调试中，发现代码不对，一定要注意，是不是少了break,这个少了是很常见的错误
				case 1:
					{
						if (UK_Data.LastError != 0) { console.log("未发现加密锁，请插入加密锁"); s_simnew1.Socket_UK.close();cb(); }
						DevicePath = UK_Data.return_value;//获得返回的UK的路径
						s_simnew1.GetID_1(DevicePath); //'读取锁的ID
					}
					break;
				case 2:
					{

						if (UK_Data.LastError != 0) { console.log("读取锁的ID时错误，错误码为：" + UK_Data.LastError.toString()); s_simnew1.Socket_UK.close(); return false; }
						keyid = toHex(UK_Data.return_value);
						s_simnew1.GetID_2(DevicePath); //'读取锁的ID
					}
					break;
				case 3:
					{

						if (UK_Data.LastError != 0) { console.log("读取锁的ID时错误，错误码为：" + UK_Data.LastError.toString()); s_simnew1.Socket_UK.close(); return false; }
						keyid = keyid + toHex(UK_Data.return_value);
						// window.alert("锁的ID是：" + keyid);
						cb(bConnect,keyid)
					}
					break;
			}

		}

		s_simnew1.Socket_UK.onclose = function () {

		}
		
		return true;
	}

	catch (e) {
		alert(e.name + ": " + e.message);
		return false;
	}
}

function Handle_IE10() {

	try {
		var DevicePath, mylen, ret, keyid, username, mykey, outstring, address, mydata, i, InString, versionex, version, seed;

		//建立操作我们的锁的控件对象，
		s_simnew1 = new ActiveXObject("Syunew6A.s_simnew6");

		DevicePath = s_simnew1.FindPort(0);//'查找加密锁
		//DevicePath = s_simnew1.FindPort_2(0,1,  70967193);//'查找指定的加密锁（使用普通算法）

		if (s_simnew1.LastError != 0) {
			window.alert("未发现加密锁，请插入加密锁"); return false;
		}
		else {
			{
				//'读取锁的ID
				keyid = toHex(s_simnew1.GetID_1(DevicePath)) + toHex(s_simnew1.GetID_2(DevicePath));
				if (s_simnew1.LastError != 0) {
					window.alert("获取ID错误,错误码是" + s_simnew1.LastError.toString());
					return false;
				}
				window.alert("锁的ID是：" + keyid);
			}
		}
		return true;
	}

	catch (e) {
		alert(e.name + ": " + e.message);
		return false;
	}
	return isUkeyData;

}


function SoftKey6W() 
    {   
            var isIE11 = navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf("rv:11.0") > -1;
          var isEDGE= navigator.userAgent.indexOf("Edge") > -1;
        var u = document.URL;
        var url;
        if (u.substring(0, 5) == "https") {
            if(isIE11 || isEDGE)
            {
                url = "wss://127.0.0.1:4007/xxx";
            }
            else
            {
                    url = "wss://localhost:4007/xxx";
                }
            } else {
                url = "ws://127.0.0.1:4007/xxx";
            }
        
        var Socket_UK;
    
        if (typeof MozWebSocket != "undefined") {
            Socket_UK = new MozWebSocket(url,"usbkey-protocol");
        } else {
            this.Socket_UK = new WebSocket(url,"usbkey-protocol");
        }
               
        this.FindPort = function(start) 
        { 
            var msg = 
            {
                FunName: "FindPort",
                start: start
            };
            this.Socket_UK.send(JSON.stringify(msg));
       };   
        
        this.FindPort_2 = function(start, in_data , verf_data)
        { 
             var msg = 
            {
                FunName: "FindPort_2",
                start: start,
                in_data: in_data,
                verf_data:verf_data
            };
            this.Socket_UK.send(JSON.stringify(msg)); 
        }; 
        
        this.FindPort_3= function(start,in_data,verf_data)
        { 
            var msg = 
            {
                FunName: "FindPort_3",
                start: start,
                in_data: in_data,
                verf_data:verf_data
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GetVersion= function(Path)
        { 
            var msg = 
            {
                FunName: "GetVersion",
                Path: Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GetVersionEx= function(Path)
        { 
            var msg = 
            {
                FunName: "GetVersionEx",
                Path: Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GetID_1= function(Path)
        { 
            var msg = 
            {
                FunName: "GetID_1",
                Path: Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GetID_2= function(Path)
        { 
            var msg = 
            {
                FunName: "GetID_2",
                Path: Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        
        this.sRead= function(Path)
        { 
            var msg = 
            {
                FunName: "sRead",
                Path: Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.sWrite = function(InData, Path)
        { 
             var msg = 
            {
                FunName: "sWrite",
                InData: InData,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg)); 
        }; 
        
        this.sWrite_2= function(InData, Path)
        { 
            var msg = 
            {
                FunName: "sWrite_2",
                InData: InData,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.sWrite_2Ex= function(InData,Path)
        { 
            var msg = 
            {
                FunName: "sWrite_2Ex",
                InData: InData,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.sWriteEx= function(InData,Path)
        { 
            var msg = 
            {
                FunName: "sWriteEx",
                InData: InData,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.sWriteEx_New= function(InData,Path)
        { 
            var msg = 
            {
                FunName: "sWriteEx_New",
                InData: InData,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.sWrite_2Ex_New= function(InData,Path)
        { 
            var msg = 
            {
                FunName: "sWrite_2Ex_New",
                InData: InData,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        
        this.SetBuf= function(InData,pos)
        { 
            var msg = 
            {
                FunName: "SetBuf",
                InData: InData,
                pos:pos
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GetBuf= function(pos)
        { 
            var msg = 
            {
                FunName: "GetBuf",
                pos: pos
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };     
        
        this.YRead= function(Address,len, HKey,LKey,Path)
        { 
            var msg = 
            {
                FunName: "YRead",
                Address:Address,
                len:len,
                HKey:HKey,
                LKey:LKey,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.YWrite= function(Address,len,HKey,LKey,Path)
        { 
            var msg = 
            {
                FunName: "YWrite",
                Address:Address,
                len:len,
                HKey:HKey,
                LKey:LKey,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.YReadString= function(Address,len,HKey,LKey,Path)
        { 
            var msg = 
            {
                FunName: "YReadString",
                Address:Address,
                len:len,
                HKey:HKey,
                LKey:LKey,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.YWriteString= function(InString,Address,HKey,LKey,Path)
        { 
            var msg = 
            {
                FunName: "YWriteString",
                InString:InString,
                Address:Address,
                HKey:HKey,
                LKey:LKey,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.SetWritePassword= function(W_Hkey,W_Lkey,new_Hkey,new_Lkey,Path)
        { 
            var msg = 
            {
                FunName: "SetWritePassword",
                W_Hkey:W_Hkey,
                W_Lkey:W_Lkey,
                new_Hkey:new_Hkey,
                new_Lkey:new_Lkey,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.SetReadPassword= function(W_Hkey,W_Lkey,new_Hkey,new_Lkey,Path)
        { 
            var msg = 
            {
                FunName: "SetReadPassword",
                W_Hkey:W_Hkey,
                W_Lkey:W_Lkey,
                new_Hkey:new_Hkey,
                new_Lkey:new_Lkey,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
         
        this.DecString= function(InString,Key)
        { 
            var msg = 
            {
                FunName: "DecString",
                InString:InString,
                Key:Key
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.EncString= function(InString,Path)
        { 
            var msg = 
            {
                FunName: "EncString",
                InString:InString,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.EncString_New= function(InString,Path)
        { 
            var msg = 
            {
                FunName: "EncString_New",
                InString:InString,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.Cal= function(Path)
        { 
            var msg = 
            {
                FunName: "Cal",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.Cal_New= function(Path)
        { 
            var msg = 
            {
                FunName: "Cal_New",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.SetCal_2= function(Key,Path)
        { 
            var msg = 
            {
                FunName: "SetCal_2",
                Key:Key,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.SetCal_New= function(Key,Path)
        { 
            var msg = 
            {
                FunName: "SetCal_New",
                Key:Key,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.SetEncBuf= function(InData,pos)
        { 
            var msg = 
            {
                FunName: "SetEncBuf",
                InData:InData,
                pos: pos
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GetEncBuf= function(pos)
        { 
            var msg = 
            {
                FunName: "GetEncBuf",
                pos: pos
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
    
        this.ReSet= function(Path)
        { 
            var msg = 
            {
                FunName: "ReSet",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };     
        
        this.MacAddr= function()
        { 
            var msg = 
            {
                FunName: "MacAddr"
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        
        this.GetChipID= function(Path)
        { 
            var msg = 
            {
                FunName: "GetChipID",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.StarGenKeyPair= function(Path)
        { 
            var msg = 
            {
                FunName: "StarGenKeyPair",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GenPubKeyY= function()
        { 
            var msg = 
            {
                FunName: "GenPubKeyY"
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GenPubKeyX= function()
        { 
            var msg = 
            {
                FunName: "GenPubKeyX"
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GenPriKey= function()
        { 
            var msg = 
            {
                FunName: "GenPriKey"
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GetPubKeyY= function(Path)
        { 
            var msg = 
            {
                FunName: "GetPubKeyY",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GetPubKeyX= function(Path)
        { 
            var msg = 
            {
                FunName: "GetPubKeyX",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.GetSm2UserName= function(Path)
        { 
            var msg = 
            {
                FunName: "GetSm2UserName",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.Set_SM2_KeyPair= function(PriKey,PubKeyX,PubKeyY,sm2UserName,Path )
        { 
            var msg = 
            {
                FunName: "Set_SM2_KeyPair",
                PriKey:PriKey,
                PubKeyX:PubKeyX,
                PubKeyY:PubKeyY,
                sm2UserName:sm2UserName,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this. YtSign= function(SignMsg,Pin,Path)
        { 
            var msg = 
            {
                FunName: "YtSign",
                SignMsg:SignMsg,
                Pin:Pin,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.YtSign_2= function(SignMsg,Pin,Path)
        { 
            var msg = 
            {
                FunName: "YtSign_2",
                SignMsg:SignMsg,
                Pin:Pin,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.YtVerfiy= function(id,SignMsg,PubKeyX, PubKeyY,VerfiySign,Path)
        { 
            var msg = 
            {
                FunName: "YtVerfiy",
                id:id,
                SignMsg:SignMsg,
                PubKeyX:PubKeyX,
                PubKeyY:PubKeyY,
                VerfiySign:VerfiySign,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.SM2_DecString= function(InString,Pin,Path)
        { 
            var msg = 
            {
                FunName: "SM2_DecString",
                InString:InString,
                Pin:Pin,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.SM2_EncString= function(InString,Path)
        { 
            var msg = 
            {
                FunName: "SM2_EncString",
                InString:InString,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.YtSetPin= function(OldPin,NewPin,Path)
        { 
            var msg = 
            {
                FunName: "YtSetPin",
                OldPin:OldPin,
                NewPin:NewPin,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.FindU= function(start)
        { 
            var msg = 
            {
                FunName: "FindU",
                start: start
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.FindU_2= function(start,in_data,verf_data)
        { 
            var msg = 
            {
                FunName: "FindU_2",
                start: start,
                in_data: in_data,
                verf_data:verf_data
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.FindU_3= function(start,in_data,verf_data)
        { 
            var msg = 
            {
                FunName: "FindU_3",
                start: start,
                in_data: in_data,
                verf_data:verf_data
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.IsUReadOnly= function(Path)
        { 
            var msg = 
            {
                FunName: "IsUReadOnly",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.SetUReadOnly= function(Path)
        { 
            var msg = 
            {
                FunName: "SetUReadOnly",
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.SetHidOnly= function(IsHidOnly,Path)
        { 
            var msg = 
            {
                FunName: "SetHidOnly",
                IsHidOnly:IsHidOnly,
                Path:Path
            };
            this.Socket_UK.send(JSON.stringify(msg));
        };   
        
        this.ResetOrder = function() 
        {
             var msg = 
            {
                FunName: "ResetOrder"
            };
             this.Socket_UK.send(JSON.stringify(msg));
         } 
         
        this.ContinueOrder = function() 
        {
             var msg = 
            {
                FunName: "ContinueOrder"
            };
             this.Socket_UK.send(JSON.stringify(msg));
         } 
    
    } 

export { //很关键
  load,login_onclick
}