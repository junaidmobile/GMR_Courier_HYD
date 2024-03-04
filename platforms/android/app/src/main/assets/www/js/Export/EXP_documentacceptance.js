
//var CMSserviceURL =  window.localStorage.getItem("CMSserviceURL");

var CMSserviceURL = 'https://gmrintluat.kalelogistics.com:7081/hhtws_doc/cms_ws_pda_non_vapt.asmx/';

var AWBid;
var type;
var VCTNo;
var flag = window.localStorage.getItem("flag");
var _vctno = window.localStorage.getItem("_vctno");
var _Door = window.localStorage.getItem("_Door");
var UserName = window.localStorage.getItem("UserName");
var flagclear = '';
var d = new Date(),
    n = d.getMonth() + 1,
    y = d.getFullYear()
t = d.getDate();

var saveDocumentsList = [];
// console.log('date = ' + t);


var dtHandoverDate = new Date();
var dtTDGDate = new Date();
// var showDocs = false;
// var displayval= "none";

// // document.getElementById('documentLabel').style.display = "none";
// // document.getElementById('documentList').style.display = "none";

// document.getElementById('documentLabel').style.display =  "none";

$(function () {


    if (window.localStorage.getItem("RoleExpTDG") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    setTodaysDate();
    getDocumentsFromMaster();
    // var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';
    AWBid = 0;
    //SHCSpanHtml(stringos);


});

function setTodaysDate() {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    var cDateTime = now.toISOString().slice(0, 16);
   // console.log('cDateTime = ' + cDateTime);
    dtHandoverDate = cDateTime;

    var splitArray = cDateTime.split('T');
    var splitString = splitArray[1];
    var dtMMDDformat = moment(cDateTime).format('DD/MM/YYYY') + ' ' + splitString;
  //  console.log('dtMMDDformat = ' + dtMMDDformat);

    document.getElementById('txtHandoverDt').value = dtHandoverDate;
    document.getElementById("txtHandoverDt").max = dtHandoverDate;


    let dateInput = document.getElementById("txtHandoverDt");
    dateInput.max = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
}

function SHCSpanHtml(newSHC) {
    var spanStr = "<tr class=''>";
    var newSpanSHC = newSHC.split(',');
    var filtered = newSpanSHC.filter(function (el) {
        return el != "";
    });

    for (var n = 0; n < filtered.length; n++) {
        var blink = filtered[n].split('~');

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'Y' && filtered[n] != '~Y') {
                spanStr += "<td class='blink_me'>" + blink[0] + "</td>";
                //console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                //console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}

function getDocumentsFromMaster() {


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {

        //console.log(JSON.stringify({
        //    'pi_strType': "DOC"
        //    // ,
        //    // 'pi_strUserName': window.localStorage.getItem("UserName"),
        //    // 'pi_strSession': ""
        //}));

        console.log(CMSserviceURL + "GetConfigurationDetails_HHT");

        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetConfigurationDetails_HHT",
            data: JSON.stringify({
                'pi_strType': "DOC"
                // ,
                // 'pi_strUserName': window.localStorage.getItem("UserName"),
                // 'pi_strSession': ""
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
               // console.log("response received");
               // console.log(response);
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
              //  console.log(xmlDoc);



                if (str != null && str != "") {
                    saveDocumentsList = [];
                    $(xmlDoc).find('Table').each(function (index) {
                        saveDocumentsList.push({
                            "DocCode": $(this).find('ConfigCode').text(),
                            "DocName": $(this).find('ConfigValue').text(),
                            "DOA_CreatedBy_C": UserName,
                            "DOA_CreatedOn_D": dtHandoverDate,
                            "isSelected": false,
                        });
                    });
                }

              //  console.log(saveDocumentsList);

                if (saveDocumentsList.length > 0)
                    buildDocumentsTable();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                //  $.alert(r.Message);
            }
        });
    }
}

function buildDocumentsTable() {
    var html = '';
    $('#documentList').empty();
    html = '';
    html = "  <div class='forms'>";
    html += "<div class='form-body' id='divMain'>";
    html += "  <form>";
    html += "<div style='text-align: center;' id='documentLabel'>";
    html += "<h5 id='lblDocuments' class='control-label labelFont'>Documents</h5>";
    html += "</div>";
    html += "<hr style='margin-top: 5px; margin-bottom: 5px;border: 0;border-top: 1px solid #ccc;'>";
    $.each(saveDocumentsList, function (i, d) {


        html += "<div class='row'>";
        html += "<div class='form-group col-xs-12 col-sm-6 col-md-6'>";
        html += " <div class='col-xs-6 col-form-label NoPadding'>";
        html += "  <label id='lblDocNAme'" + parseInt(i + 1) + "class='control-label'>" + saveDocumentsList[i].DocName.toString() + "</label>";
        html += "  </div>";
        html += " <div class='col-xs-6 NoPadding' style='text-align: center;'>";
        // if (saveDocumentsList[i].isSelected == true)
        //     html += "    <input type='checkbox' id='chkSelected +  parseInt(i + 1) + '" + " class="larger" checked  style="width: 20px;height: 20px;" name="completed">"';
        // else
        //     html += "    <input type='checkbox' id='chkSelected +  parseInt(i + 1) + '" + " class="larger"  style="width: 20px;height: 20px;" name="completed">"';


        if (saveDocumentsList[i].isSelected == true)
            html += '<input type="checkbox" id="chkSelected' + parseInt(i + 1) + '" class="larger" checked style="width: 20px;height: 20px;" name="completed">';
        else
            html += '<input type="checkbox" id="chkSelected' + parseInt(i + 1) + '" class="larger" style="width: 20px;height: 20px;" name="completed">';


        html += " </div>";
        html += "  </div>";

        html += "</div>";

    });


    html += "  </form>";
    html += "    </div>";
    html += "  </div>";
    html += "  </div>";
    $("#documentList").append(html);
}

function GetVCTDetailsForTDGAcceptance() {

    var awbNo = $('#txtAwbNo').val();
   // console.log('awbNo = ' + awbNo);
    if (awbNo == '') {
        clearBeforePopulate();
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    //   clearALL();

   // console.log(JSON.stringify({
   //     'pi_strAWBNo': awbNo
   // }));

   // console.log(CMSserviceURL + "GetDOCAcceptanceDetails_HHT");

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
  //  console.log('connectionStatus = ' + connectionStatus);
    if (errmsg == "" && connectionStatus == "online") {
        clearBeforePopulate();
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetDOCAcceptanceDetails_HHT",
            data: JSON.stringify({
                'pi_strAWBNo': awbNo
            }),

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                // console.log("response received");
                // console.log(response);
                $("body").mLoading('hide');
                var str = response.d;
                var xmlDoc = $.parseXML(str);
                var hasError = false;
               // console.log(xmlDoc);

                if (str != null && str != "") {

                    $(xmlDoc).find('Table').each(function (index) {


                        var outMsg = $(this).find('OutMsg').text();

                        if (outMsg.toString().trim() != '') {
                            hasError = true;
                            // $('#txtAwbNo').focus();

                            $('#txtAwbNo').val('');
                            $.alert(outMsg);
                            return;
                        }

                        //OutMsg
                        $('#txtAwbNo').val($(this).find('AWBNo').text());
                        SHCSpanHtml($(this).find('Commodity').text());

                        $('#txtAcceptedPieces').val($(this).find('Pieces').text());
                        $('#txtAcceptedGrWt').val($(this).find('GrWt').text());
                        $('#txtAcceptedChwt').val($(this).find('ChWt').text());
                        $('#txtRemarks').val($(this).find('Remarks').text());

                        AWBid = Number($(this).find('AWBId').text());
                        //console.log(AWBid);
                        var cDateTime = $(this).find('FLightDate').text();
                        var splitArray = cDateTime.split('T');
                        var splitString = splitArray[0];
                        var dtMMDDformat = moment(splitString).format('DD-MMM-YYYY');
                        dtMMDDformat = dtMMDDformat.toString().replace(/-/g, "");
                        // console.log('dtMMDDformat = ' + dtMMDDformat);

                        var flightNoText = $(this).find('FlightNo').text() + ' - ' + dtMMDDformat;
                        $('#txtFlightNoDt').val(flightNoText);

                        var TDGDate = new Date($(this).find('TDGDate').text());
                        TDGDate.setMinutes(TDGDate.getMinutes() - TDGDate.getTimezoneOffset());
                        var TDGDateTime = TDGDate.toISOString().slice(0, 16);
                        dtTDGDate = TDGDateTime;
                       // console.log('dtTDGDate from db= ' + dtTDGDate);

                        document.getElementById("txtHandoverDt").min = TDGDateTime;
                    });


                    if (!hasError) {
                        var docCount = 0;
                        $(xmlDoc).find('Table1').each(function (index) {
                            docCount++;
                            //console.log($(this).find('DOA_DocCode_C').text());
                            var currDocCode = $(this).find('DOA_DocCode_C').text();
                            saveDocumentsList.find((o, i) => {
                                if (o.DocCode === currDocCode) {
                                    saveDocumentsList[i].isSelected = true;
                                }
                            });

                        });

                        if (docCount == 0) {
                            saveDocumentsList.find((o, i) => {
                                if (o.DocCode === "SECDOC") {
                                    saveDocumentsList[i].isSelected = true;
                                }
                            });
                        }
                        //  console.log(saveDocumentsList);
                        buildDocumentsTable();
                    }

                }
                else {
                    errmsg = 'AWB No. does not exists';
                    // $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                //  $.alert(r.Message);
            }
        });
    }





}


function saveDocumentAcceptance(isCancel) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    if (AWBid == 0) {
        errmsg = "Please enter AWB No.</br>";
        $.alert(errmsg);
        return;
    }

    //dates validation pendin 

    //handover date must be between tdg datetime and current datetime

    const From = new Date(dtTDGDate);
    const date = new Date($('#txtHandoverDt').val());
    const To = new Date();


    if (From <= date && To >= date) {
       // console.log("Date is in range");
    } else {

        To.setMinutes(To.getMinutes() - To.getTimezoneOffset());
        var cDateTime = To.toISOString().slice(0, 16);

        errmsg = "Handover Datetime must be betweebn TDG Datetime (" + dtTDGDate.replace("T", " ") +
            ") and Current Datetime (" + cDateTime.replace("T", " ") + ")";

        $.alert(errmsg);
        return;
    }

    var chkCount = 0;
    $.each(saveDocumentsList, function (i, d) {
        var ctrlName = "#chkSelected" + parseInt(i + 1);
        // console.log(ctrlName);
        if ($(ctrlName).is(":checked")) {
            // console.log(ctrlName + "  " + saveDocumentsList[i].DocName.toString() + "  is checked");
            chkCount++;
            saveDocumentsList[i]['isSelected'] = true;
        }
        else {
            saveDocumentsList[i]['isSelected'] = false;
            //console.log(ctrlName + "  " + saveDocumentsList[i].DocName.toString() + "  is NOT checked");
        }

    });

  //  console.log("Total checked docs = " + chkCount);

    if (!isCancel)
        if (chkCount == 0) {

            errmsg = "Please select atleast one document.</br>";
            $.alert(errmsg);
            return;

        }

    var xml = "";

    xml = '<DocAccDet>';
    $.each(saveDocumentsList, function (i, d) {
        if (saveDocumentsList[i].isSelected == true)
            // "<DocumentAcceptance DocCode=" + "AWBDOC" AwbRowId="567" />'

            xml = xml + '<DocumentAcceptance DocCode ="' + saveDocumentsList[i].DocCode.toString() + '"  AwbRowId  ="' + AWBid + '"/>';

    });
    xml = xml + '</DocAccDet>';
   // console.log(xml);

    var Remarks = $('#txtRemarks').val();
   // console.log("AWBid " + AWBid);



    //console.log(JSON.stringify({
    //    'pi_DocRemarks': Remarks, 'pi_intAwbId': Number(AWBid),
    //    'pi_strInputXML': xml, 'pi_strLoggedUser': UserName,
    //    'pi_dtCreatedOn': $('#txtHandoverDt').val(),

    //    'pi_Isdeleted': isCancel ? true : false,
    //}));

    // return;

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "SaveDOCAcceptanceDetails_HHT",
            data: JSON.stringify({
                'pi_DocRemarks': Remarks, 'pi_intAwbId': Number(AWBid),
                'pi_strInputXML': xml, 'pi_strLoggedUser': UserName,
                'pi_dtCreatedOn': $('#txtHandoverDt').val(),

                'pi_Isdeleted': isCancel ? true : false,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    if (index == 0) {
                        //if (($(this).find('OutMsg').text()).length < Number(5))
                        $.alert($(this).find('OutMsg').text());
                        //else
                        //    $.alert($(this).find('OutMsg').text());
                    }
                });
                //clearALL();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                //$.alert('Some error occurred while saving data');
                var r = jQuery.parseJSON(msg.responseText);
                //  $.alert(r.Message);
            }
        });
        return false;
    }

}

function BackFromSbill() {
    $('#divShippingBillInfo').hide();
    $('#divTDGinfo').show();

}

function clearALL() {

    $('#txtAwbNo').focus();

    $('#txtAwbNo').val('');
    $('#txtFlightNoDt').val('');
    $('#txtCommodity').val('');
    $('#txtAcceptedPieces').val('');
    $('#txtAcceptedGrWt').val('');
    $('#txtAcceptedChwt').val('');

    $('#txtHandoverDt').val('');
    $('#txtRemarks').val('');
    // $('#documentLabel').hide();
    // $('#documentList').hide();
    setTodaysDate();
    buildDocumentsTable();

    //     showDocs = false;

    //  displayval= "none";
    // document.getElementById('documentLabel').style.display = "none";
    // document.getElementById('documentList').style.display = "none";

    // $('#txtAWBDestination').val('');
    // $('#txtDecPackages').val('');
    // $('#txtDeclGrossWt').val('');
    // $('#txtDeclchrgWt').val('');
    // $('#txtRcvdGrossWt').val('');
    // $('#txtRcvdchrgWt').val('');
    // $('#txtDeclVolWt').val('');
    // $('#txtRcvdVolWt').val('');
    // $('#txtCommodity').val('');
    // $('#txtReceivedPkgs').val('');
    // $('#txtExporterName').val('');
    // $('#txtIataCode').val('');
    // $('#txtCHACode').val('');
    // $("#btnSave").removeAttr("disabled");
    // $("#txtReceivedPkgs").removeAttr("disabled");
    // if (type == 'A')
    //     $('#txtAWBNo').focus();
    // $('#ddlAWBno').empty();
    // $('#divAddLocation').empty();
    // $('#spnErrormsg').text('');

    // $('#btnDockIn').attr('disabled', 'disabled');
    // $('#btnNext').attr('disabled', 'disabled');
    // $('#btnDockOut').attr('disabled', 'disabled');
    // $('#btnUnScanned').attr('disabled', 'disabled');

}

function FocusSlot() {
    if (type == 'S')
        $('#txtSlotNo').focus();
}

function clearBeforePopulate() {
    AWBid = 0;
    $('#txtFlightNoDt').val('');
    $('#txtCommodity').val('');
    $('#txtAcceptedPieces').val('');
    $('#txtAcceptedGrWt').val('');
    $('#txtAcceptedChwt').val('');

    $('#txtHandoverDt').val('');
    $('#txtRemarks').val('');
    // $('#documentLabel').hide();
    // $('#documentList').hide();
    setTodaysDate();
    $.each(saveDocumentsList, function (i, d) {
        saveDocumentsList[i].isSelected = false;
    });
   // console.log(saveDocumentsList);
    buildDocumentsTable();
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function clearModalTbl() {

    $('#divAddLocation').empty();


}
