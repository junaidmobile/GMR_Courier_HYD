
//GMR COU
//var GHAserviceURL = 'https://gmrcourieruat.kalelogistics.com:7081/GMR/Services/HHTImpServices.asmx/';
//var GHAImportFlightserviceURL = 'https://gmrcourieruat.kalelogistics.com:7081/GMR/Services/HHTImpServices.asmx/';
//var GHAExportFlightserviceURL = 'https://gmrcourieruat.kalelogistics.com:7081/GMR/Services/hhtExpservices.asmx/';
//var CMSserviceURL = 'https://gmrintluat.kalelogistics.com/HHTWS/cms_ws_pda.asmx/';


//var GHAserviceURL = 'https://courier.gmrcargo.com:7081/Galaxy/Services/HHTImpServices.asmx/';
//var GHAImportFlightserviceURL = 'https://courier.gmrcargo.com:7081/Galaxy/Services/HHTImpServices.asmx/';
//var GHAExportFlightserviceURL = 'https://courier.gmrcargo.com:7081/Galaxy/Services/HHTExpServices.asmx/';
//var CMSserviceURL = 'https://galaxytest.kalelogistics.com/GalaxyINTMABBHHTWS/CMS_WS_pda.asmx/';


var GHAserviceURL = 'https://adaniuat.kalelogistics.com/GHAAdaniCourierUAT/Services/HHTImpServices.asmx/';
var GHAImportFlightserviceURL = 'https://adaniuat.kalelogistics.com/GHAAdaniCourierUAT/Services/HHTImpServices.asmx/';
var GHAExportFlightserviceURL = 'https://adaniuat.kalelogistics.com/GHAAdaniCourierUAT/Services/HHTExpServices.asmx/';
var CMSserviceURL = 'https://gmrcourieruat.kalelogistics.com:7081//GalaxyINTMABBHHTWS/CMS_WS_PDA.asmx/';


//var GHAserviceURL = 'https://galaxyqa.kalelogistics.com/NASEBB/Services/HHTIMPServices.asmx/';
//var GHAImportFlightserviceURL = 'https://galaxyqa.kalelogistics.com/NASEBB/Services/HHTIMPServices.asmx/';
//var GHAExportFlightserviceURL = 'https://galaxyqa.kalelogistics.com/NASEBB/Services/HHTExpServices.asmx/';
//var CMSserviceURL = 'https://gmrintluat.kalelogistics.com:7081/HHTWS/CMS_WS_PDA_NON_VAPT.asmx/';



var deviceUUID;
var encryptedUUID;
document.addEventListener("deviceready", SetRememberLogin, false);
document.addEventListener("backbutton", exitFromApp, false);

var allData;

$(function () {
    temp();
    //$(":text").addClear();
    //$(":password").addClear();
    //$('input[type=text]').addClear();
    //$('input[type=password]').addClear();
    if (typeof (MSApp) !== "undefined") {
        MSApp.execUnsafeLocalFunction(function () {
            //$('input[type=text]').addClear();
            //$('input[type=password]').addClear();
        });
    } else {
        $('input[type=text]').addClear();
        $('input[type=password]').addClear();
    }

    clearStorageExcept(['UserName', 'Password', 'IsRememberChecked']);

    SetRememberLogin();
});


function ProcessLogin1() {

    //window.localStorage.setItem("UserID", '1');
    //window.localStorage.setItem("UserName", 'kale');
    //window.localStorage.setItem("companyCode", 'BUD');
    //window.localStorage.setItem("SHED_AIRPORT_CITY", 'BUD');
    //window.localStorage.setItem("SHED_CODE", 'BUD');

    //window.localStorage.setItem("GHAserviceURL", GHAserviceURL);
    //window.localStorage.setItem("GHAImportFlightserviceURL", GHAImportFlightserviceURL);
    //window.localStorage.setItem("GHAExportFlightserviceURL", GHAExportFlightserviceURL);
    ////window.localStorage.setItem("CargoWorksServiceURL", CargoWorksServiceURL);
    //window.localStorage.setItem("CMSserviceURL", CMSserviceURL);
    //window.localStorage.setItem("CMSserviceURL", CMSserviceURL);

    //window.location = "GalaxyHome.html";

}

function ProcessLogin() {
    //window.location = "GalaxyHome.html";
    //return;

    var errmsg = "";
    var Uname = $('#txtUserName').val();
    var Pass = $('#txtPassword').val();

    window.localStorage.setItem("Uname", Uname);

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    if (Uname == null || Uname == "") {
        errmsg = errmsg + 'Please enter user id.<br/>';
        $.alert(errmsg);
        HideLoader();
        return;
    }

    if (Pass == null || Pass == "") {
        errmsg = errmsg + 'Please enter password.';
        $.alert(errmsg);
        HideLoader();
        return;
    }


    //  SetLoginRolesRights(Uname);

    if (Uname != null && Uname != "" && Pass != null && Pass != "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetLoginUserDetails",
            data: JSON.stringify({ 'LoginName': Uname, 'Password': Pass }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log('Details got via login: ', response);
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {

                    var xmlDoc = $.parseXML(str);
                    console.log('Details got via login: ', xmlDoc);
                    $(xmlDoc).find('Table').each(function (index) {
                        window.localStorage.setItem("UserID", $(this).find('Userid').text());
                        window.localStorage.setItem("UserName", $(this).find('User_Name').text());
                        window.localStorage.setItem("companyCode", $(this).find('CompanyCode').text());
                        window.localStorage.setItem("SHED_AIRPORT_CITY", $(this).find('SHED_AIRPORT_CITY').text());
                        window.localStorage.setItem("SHED_CODE", $(this).find('SHED_CODE').text());

                        window.localStorage.setItem("GHAserviceURL", GHAserviceURL);
                        window.localStorage.setItem("GHAImportFlightserviceURL", GHAImportFlightserviceURL);
                        window.localStorage.setItem("GHAExportFlightserviceURL", GHAExportFlightserviceURL);
                        //window.localStorage.setItem("CargoWorksServiceURL", CargoWorksServiceURL);
                        window.localStorage.setItem("CMSserviceURL", CMSserviceURL);
                        window.localStorage.setItem("CMSserviceURL", CMSserviceURL);

                        window.location = "GalaxyHome.html";
                    });

                }
                else {
                    HideLoader();
                    errmsg = errmsg + 'Invalid username and/or password.';
                    $.alert(errmsg);
                }
            },
            error: function (msg) {
                HideLoader();
                var r = jQuery.parseJSON(msg.responseText);
                $.alert("Message: " + r.Message);
                // $.alert("Login failed due to some error");
            }
        });


        //window.location = "GalaxyHome.html";

        //if (Uname == "VENKATAS" && Pass == "123") {
        //    window.location = "GalaxyHome.html";
        //}
    }
    else if (connectionStatus == "offline") {
        HideLoader();
        $.alert('No Internet Connection!');
    }
    if (errmsg != "") {
        HideLoader();
        $.alert(errmsg);
    }
}

function clearALL() {
    $('#txtUserName').val('');
    $('#txtPassword').val('');
}

function RememberCheck() {
    if ($('#chkRemember').is(':checked')) {
        var UserName = $('#txtUserName').val();
        var PassWord = $('#txtPassword').val();
        window.localStorage.setItem("UserName", UserName);
        window.localStorage.setItem("Password", PassWord);
        window.localStorage.setItem("IsRememberChecked", "true");
    }
    else {
        window.localStorage.setItem("UserName", "");
        window.localStorage.setItem("Password", "");
        window.localStorage.setItem("IsRememberChecked", "false");
    }
}

function SetRememberLogin() {
    var U = window.localStorage.getItem("UserName");
    var P = window.localStorage.getItem("Password");
    var R = window.localStorage.getItem("IsRememberChecked");
    if (R != null && R == "true") {
        $('#chkRemember').prop("checked", true);
    }
    else {
        $('#chkRemember').prop("checked", false);
    }
    if (U != null && U != "") {
        $('#txtUserName').val(U);
    }
    if (P != null && P != "") {
        $('#txtPassword').val(P);
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    if (connectionStatus == 'offline') {
        $.alert('No Internet Connection!');
        setInterval(function () {
            connectionStatus = navigator.onLine ? 'online' : 'offline';
            if (connectionStatus == 'online') {
            }
            else {
                $.tips('You are offline. Please contact Admin.');
            }
        }, 3000);
    }
}

function SetLoginRolesRights() {

    var Username = $('#txtUserName').val();

    if (Username != null && Username != "") {
        $.ajax({
            type: 'POST',
            timeout: 6000,
            async: false,
            url: CMSserviceURL + "GetHHTUserRolesRightsForLoginId_PDA",
            data: JSON.stringify({ 'pi_strLoginId': Username }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            //type: 'POST',
            //timeout: 4000,
            //url: CMSserviceURL + "GetHHTUserRolesRightsForLoginId_PDA",
            //dataType: "text",
            //async: false,
            //crossDomain: true,
            //data: "pi_strLoginId=" + Username,
            success: function (response) {
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HVTX') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpDashboard", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpDashboard", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HVTM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpVehicleTracking", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpVehicleTracking", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HTDM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpTDG", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpTDG", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HEBI') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpBinning", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpBinning", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HEIM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpIntlMvmt", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpIntlMvmt", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HUNI') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpUnitization", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpUnitization", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HARM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpAirsideRelease", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpAirsideRelease", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HEQM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpExportsQuery", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpExportsQuery", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HVCT') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpVCTCheck", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpVCTCheck", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HFLTX') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleImpDashboard", '1');
                            }
                            else
                                window.localStorage.setItem("RoleImpDashboard", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HFLTC') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPFlightCheck", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPFlightCheck", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HSEG') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPSegregation", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPSegregation", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HIBIN') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPBinning", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPBinning", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HIIM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPIntlMvmt", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPIntlMvmt", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HFBM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPFwdBkd", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPFwdBkd", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'FDM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPFinalDelivery", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPFinalDelivery", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'IQM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPImportQuery", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPImportQuery", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'IDUM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPDocUpload", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPDocUpload", '0');
                        }

                    });

                }
                else {
                    HideLoader();
                    errmsg = errmsg + 'Invalid username and/or password.';
                    $.alert(errmsg);
                }
            },
            error: function (msg) {
                HideLoader();
                //var r = jQuery.parseJSON(msg.responseText);
                //alert("Message: " + r.Message);                
            }
        });


        //window.location = "GalaxyHome.html";

        //if (Uname == "VENKATAS" && Pass == "123") {
        //    window.location = "GalaxyHome.html";
        //}
    }

}

function exitFromApp() {
    //console.log("in button");
    clearStorageExcept(['UserName', 'Password', 'IsRememberChecked']);
    navigator.app.exitApp();
}

function onCreateAWB() {
    window.location = "ExpCreateAWB.html";
}
function onSearchAWB() {
    window.location = "ExpSearchAWB.html";
}
function onFlightCheck() {
    window.location = "IMP_FlightCheck.html";
}
function onIMPShipmentLoc() {
    window.location = "IMP_ShipmentLocation.html";
}

clearStorageExcept = function (exceptions) {
    var storage = localStorage;
    var keys = [];
    var exceptions = [].concat(exceptions); //prevent undefined

    //get storage keys
    $.each(localStorage, function (key, val) {
        keys.push(key);
    });

    //loop through keys
    for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        var deleteItem = true;

        //check if key excluded
        for (j = 0; j < exceptions.length; j++) {
            var exception = exceptions[j];
            if (key == exception) {
                deleteItem = false;
            }
        }

        //delete key
        if (deleteItem) {
            localStorage.removeItem(key);
        }
    }
}

function viewPassword() {
    var x = document.getElementById("txtPassword");
    if (x.type === "password") {
        $(".zmdi-eye").show();
        $(".zmdi-eye-off").hide();
        x.type = "text";
    } else {
        $(".zmdi-eye").hide();
        $(".zmdi-eye-off").show();
        x.type = "password";
    }
}



function myfunction() {
    var dta = '! 0 200 200 575 1' +
        'PW 575' +
        'TONE 0' +
        'SPEED 2' +
        'ON - FEED IGNORE' +
        'NO - PACE' +
        'BAR - SENSE' +
        'BT OFF' +
        'B 128 2 30 102 62 261 1234566' +
        'T 5 0 32 441' +
        'T 5 0 32 73 HAWB No.: H2' +
        'T 5 0 32 179 MAWB No.: 12588808880' +
        'T 5 0 32 108 HYD' +
        'T 5 0 249 108 12345' +
        'T 5 0 32 222 Jan 17 2023 12: 00AM' +
        'T 5 0 324 222 Jan  1 1900  3: 20PM' +
        'T 5 0 324 179 0' +
        'T 0 6 10 377 1234566' +
        'T 5 0 32 138 MPS No.:99999999999' +
        'PRINT';
}

function finalPRintingSlip() {
    //var printedData =
    //    '^XA\r\n' +
    //    '^FO100,100\r\n' +
    //    '^GB70,70,70,,3^FS\r\n' +
    //    '^FO200,100\r\n' +
    //    '^GB70,70,70,,3^FS\r\n' +
    //    '^FO300,100\r\n' +
    //    '^GB70,70,70,,3^FS\r\n' +
    //    '^FO400,100\r\n' +
    //    '^GB70,70,70,,3^FS\r\n' +
    //    '^FO107,110^CF0,70,93\r\n' +
    //    '^FR^FDREVERSE^FS\r\n' +
    //    '^XZ';



    //var printedData = '^XA\r\n' +
    //    '^FX Second section with recipient address and permit information.\r\n' +
    //    '^CFA,30\r\n' +
    //    '^FO50,300^FDHAWB No.: H101^FS\r\n' +
    //    '^FO50,340^FDMAWB No.: 12534375832^FS\r\n' +
    //    '^FO50,380^FDLocation : HYD39021^FS\r\n' +
    //    '^FO50,420^FDDate : Feb 10 2023 12: 00AM^FS\r\n' +
    //    '^FO50,420^FDMPS No.: 08022022114601183^FS\r\n' +
    //    //'^CFA,15\r\n' +
    //    //'^FO600,300^GB150,150,3^FS\r\n' +
    //    //'^FO638,340^FDPermit^FS\r\n' +
    //    //'^FO638,390^FD123456^FS\r\n' +
    //    /*'^FO50,500^GB700,3,3^FS\r\n' +*/
    //    '^FX Third section with bar code.\r\n' +
    //    '^BY5,2,270\r\n' +
    //    '^FO100,550^BC^FD08022022114601183^FS\r\n' +
    //    '^XZ\r\n';


    //var printedData = 'CT~~CD,~CC^~CT~\r\n' +
    //    '^XA\r\n' +
    //    '~TA000\r\n' +
    //    '~JSN\r\n' +
    //    '^LT40\r\n' +
    //    '^MNW\r\n' +
    //    '^MTD\r\n' +
    //    '^PON\r\n' +
    //    '^PMN\r\n' +
    //    '^LH0,0\r\n' +
    //    '^JMA\r\n' +
    //    '^PR14,14\r\n' +
    //    '~SD10\r\n' +
    //    '^JUS\r\n' +
    //    '^LRN\r\n' +
    //    '^CI27\r\n' +
    //    '^PA0,1,1,0\r\n' +
    //    '^XZ\r\n' +
    //    '^XA\r\n' +
    //    '^MMT\r\n' +
    //    '^PW847\r\n' +
    //    '^LL609\r\n' +
    //    '^LS0\r\n' +
    //    '^BY6,3,110^FT55,279^BCN,,N,N\r\n' +
    //    '^FH\^FD>;2023000000000001^FS\r\n' +
    //    '^FT203,363^A0N,23,43^FH\^CI28^FDWORLD WIDE EXPRESS^FS^CI27\r\n' +
    //    '^FT55,47^A0N,28,28^FH\^CI28^FDMAWB No. :^FS^CI27\r\n' +
    //    '^FT196,47^A0N,28,38^FH\^CI28^FD12345678912^FS^CI27\r\n' +
    //    '^FT564,47^A0N,28,38^FH\^CI28^FD12345678912^FS^CI27\r\n' +
    //    '^FT408,47^A0N,28,28^FH\^CI28^FDHAWB No. :^FS^CI27\r\n' +
    //    '^FT55,157^A0N,28,28^FH\^CI28^FDOrigin : ^FS^CI27\r\n' +
    //    '^FT160,157^A0N,28,28^FH\^CI28^FDHYD^FS^CI27\r\n' +
    //    '^FT232,157^A0N,28,28^FH\^CI28^FDDestination : ^FS^CI27\r\n' +
    //    '^FT399,157^A0N,28,28^FH\^CI28^FDBOM^FS^CI27\r\n' +
    //    '^FT487,157^A0N,28,28^FH\^CI28^FDPiece No. : ^FS^CI27\r\n' +
    //    '^FT628,157^A0N,28,28^FH\^CI28^FD1 / 5^FS^CI27\r\n' +
    //    '^FT55,82^A0N,28,28^FH\^CI28^FDDetention No. :^FS^CI27\r\n' +
    //    '^FT247,82^A0N,28,28^FH\^CI28^FDCOUIMPDET100120230001^FS^CI27\r\n' +
    //    '^FT55,122^A0N,28,28^FH\^CI28^FDMPS No. :^FS^CI27\r\n' +
    //    '^FT247,122^A0N,28,28^FH\^CI28^FD08022022114601183^FS^CI27\r\n' +
    //    '^FT499,122^A0N,28,28^FH\^CI28^FDDate : ^FS^CI27\r\n' +
    //    '^FT577,122^A0N,28,28^FH\^CI28^FD21 Feb 2023^FS^CI27\r\n' +
    //    '^FT82,331^A0N,52,89^FH\^CI28^FD2023000000000001^FS^CI27\r\n' +
    //    '^PQ1,,,Y\r\n' +
    //    '^XZ\r\n';



    //var printedData = 'CT~~CD,~CC^~CT~\r\n' +
    //    '^XA\r\n' +
    //    '~TA000\r\n' +
    //    '~JSN\r\n' +
    //    '^LT40\r\n' +
    //    '^MNW\r\n' +
    //    '^MTD\r\n' +
    //    '^PON\r\n' +
    //    '^PMN\r\n' +
    //    '^LH0,0\r\n' +
    //    '^JMA\r\n' +
    //    '^PR14,14\r\n' +
    //    '~SD10\r\n' +
    //    '^JUS\r\n' +
    //    '^LRN\r\n' +
    //    '^CI27\r\n' +
    //    '^PA0,1,1,0\r\n' +
    //    '^XZ\r\n' +
    //    '^XA\r\n' +
    //    '^MMT\r\n' +
    //    '^PW847\r\n' +
    //    '^LL609\r\n' +
    //    '^LS0\r\n' +
    //    '^BY6,3,110^FT55,279^BCN,,N,N\r\n' +
    //    '^FH\^FD>;' + PackgID + '^FS\r\n' + // system generated 
    //    '^FT203,363^A0N,23,43^FH\^CI28^FD' + CourierOperatorName + '^FS^CI27\r\n' +
    //    '^FT55,47^A0N,28,28^FH\^CI28^FDMAWB No. :^FS^CI27\r\n' +
    //    '^FT196,47^A0N,28,38^FH\^CI28^FD' + MAWBNo + '^FS^CI27\r\n' +
    //    '^FT564,47^A0N,28,38^FH\^CI28^FD' + HAWBNo + '^FS^CI27\r\n' +
    //    '^FT408,47^A0N,28,28^FH\^CI28^FDHAWB No. :^FS^CI27\r\n' +
    //    '^FT55,157^A0N,28,28^FH\^CI28^FDOrigin : ^FS^CI27\r\n' +
    //    '^FT160,157^A0N,28,28^FH\^CI28^FD' + Origin + '^FS^CI27\r\n' +
    //    '^FT232,157^A0N,28,28^FH\^CI28^FDDestination : ^FS^CI27\r\n' +
    //    '^FT399,157^A0N,28,28^FH\^CI28^FD' + Destination + '^FS^CI27\r\n' +
    //    '^FT487,157^A0N,28,28^FH\^CI28^FDPiece No. : ^FS^CI27\r\n' +
    //    '^FT628,157^A0N,28,28^FH\^CI28^FD' + Pcs_1/5 + '^FS^CI27\r\n' +
    //    '^FT55,82^A0N,28,28^FH\^CI28^FDDetention No. :^FS^CI27\r\n' +
    //    '^FT247,82^A0N,28,28^FH\^CI28^FD' + DetentionNO + '^FS^CI27\r\n' +
    //    '^FT55,122^A0N,28,28^FH\^CI28^FDMPS No. :^FS^CI27\r\n' +
    //    '^FT247,122^A0N,28,28^FH\^CI28^FD' + MPSNo + '^FS^CI27\r\n' +
    //    '^FT499,122^A0N,28,28^FH\^CI28^FDDate : ^FS^CI27\r\n' +
    //    '^FT577,122^A0N,28,28^FH\^CI28^FD' + Date_21_Feb_2023 + '^FS^CI27\r\n' +
    //    '^FT82,331^A0N,52,89^FH\^CI28^FD' + PackgID + '^FS^CI27\r\n' +
    //    '^PQ1,,,Y\r\n' +
    //    '^XZ\r\n';

    console.log(printedData);

    window.DatecsPrinter.listBluetoothDevices(
        function (devices) {
            window.DatecsPrinter.connect(devices[0].address,
                function () {
                    // printLogo();
                    //alert(devices[0].address);
                    PrintCourierData(printedData);
                },
                function () {
                    // alert(JSON.stringify(error));
                }
            );
        },
        function (error) {
            // alert(JSON.stringify(error));
        }
    );


}
function PrintCourierData(printedData) {
    // console.log(formatedDataofPRN)
    //  alert(printedData)
    window.DatecsPrinter.printText(printedData, 'ISO-8859-1',
        function () {

            // alert('print success');
            // printMyBarcode();
        }
    );
}


function temp() {
    var tempo = '! 0 200 200 406 1\r\nPW 575\r\nTONE 0\r\nSPEED 2\r\nON-FEED IGNORE\r\nNO-PACE\r\nBAR-SENSE\r\nT 5 0 20 50 MAWB:\r\nT 5 0 114 50 12523546541\r\nT 5 0 259 50 HAWB:\r\nT 5 0 350 51 HAWB556\r\nT 5 0 21 85 Detention No. :\r\nT 5 0 190 85 \r\nT 5 0 20 119 MPS:\r\nT 5 0 86 119 879876546\r\nT 5 0 321 119 Date :\r\nT 5 0 393 119 Jan  1 1900 12:00AM\r\nT 5 0 21 153 Origin :\r\nT 5 0 109 153 DXB\r\nT 5 0 213 153 Dest. :\r\nT 5 0 289 153 BOM\r\nT 5 0 388 153 Piece :\r\nT 5 0 468 153 1/5\r\nBT OFF\r\nB 128 4 30 81 37 189 230000000227\r\nT 0 6 94 277 230000000227\r\nT 5 0 21 332 OMNI RELIABLE LOGISTICS\r\nPRINT';

    console.log(tempo);
}