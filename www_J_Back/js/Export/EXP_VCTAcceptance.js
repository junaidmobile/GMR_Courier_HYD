var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var VCTNo = window.localStorage.getItem("VCTNo");
var Door = window.localStorage.getItem("Door");

var flightSeqNo;
var ULDSeqNo;
var TotalvolumatricChWt;
var counter = 1;
var HAWBNo;
var RemainingPkg;
var IsBaggage;
var RemainingWt;
var WtUOM;
var IsSecured;
var REFERENCE_DESCRIPTION;
var REFERENCE_DATA_IDENTIFIER;
var REFERENCE_NUMBER_1;
var _xmlDocTable;
var REFERENCE;
var IDENTIFIER;
var nextValue;
var inputRows = '';
var ConsignmentRowID;
var DocumentNo;
var IsSecuredTF;
var selectTestHaWB = 'select';
var _vlaueofTrolleytext;
var MawbNo;
var HawbNo;
var volumatricChWt;

var AL_ROWID_I;
var SDA_ROWID_I;
var SDA_SBNo_C;
var SDA_AWBNumber_C;
var SDA_HAWBNo_C;
var SDA_PackageCount;
var SDA_GrossWt_I;
var SDA_TimeStamp_Dt;
var SDA_LockStatus_I;
var SDA_IsManaual_B;
var SDA_SBDate;
var selectedAWBNo = '';
var aaSDA_SBNo_C;

var TrolleyNo;
var TrolleyGrossWt;
var TrolleyTareWt;
var _TLRowId = '0';
var remPCS;
$(function () {


    $('#lblVCTNo').text(VCTNo)
    GetAWBSBDetail_HHT(VCTNo);

    GetTrolleyListDetails_HHT();


    $('#ddlAWBNo').change(function () {

        if ($('#ddlAWBNo').val() == '0') {

            clearALL();
            return;

        }

        var str = $(this).find("option:selected").text();
        selectedAWBNo = str.substring(0, 11);

        _Value = $("option:selected", this).val();

        //sbno = _Value.split(",")[0];
        //awbid = _Value.split(",")[1];

        ConsignmentRowID = $('option:selected', this).val();
        $(_xmlDocTable).find('Table').each(function (index) {
            if (ConsignmentRowID == $(this).find('SDA_SBNo_C').text()) {
                if ($(this).find('SDA_SBNo_C').text() == ConsignmentRowID) {
                    SDA_SBNo_C = $(this).find('SDA_SBNo_C').text();
                    SDA_HAWBNo_C = $(this).find('SDA_HAWBNo_C').text();

                    $('#txtSBNo').val(SDA_SBNo_C);
                    $('#txtHAWB').val(SDA_HAWBNo_C);

                    // $('#txPieces').val($(this).find('SDA_PackageCount_I').text());
                    $('#txPieces').val($(this).find('RemainingPieces').text());
                    $('#txtCommodityType').val($(this).find('CommodityType').text());

                    remPCS = $(this).find('RemainingPieces').text();
                    
                    var newSHC = $(this).find('SHCCodes').text();
                    $("#TextBoxDivforSHCCode").empty();
                    SHCSpanHtml(newSHC);

                    // $('#txtScaleWt').val($(this).find('SDA_GrossWt_I').text());
                    $('#txtScaleWt').val($(this).find('RemainingGrWt').text());
                    $('#txtGroupId').focus();

                    aaSDA_SBNo_C = SDA_SBNo_C;

                    if ($(this).find('RemainingPieces').text() == '0') {
                        errmsg = "TDG already done for Airway Bill No.:" + $(this).find('SDA_AWBNumber_C').text() + "/ Shipping Bill No.: " + $(this).find('SDA_SBNo_C').text() + "</br>";
                        $.alert(errmsg);
                        //  $("#spnMsg").text("TDG already done for Airway Bill No.:" + $(this).find('SDA_AWBNumber_C').text() + "/ Shipping Bill No.: " + $(this).find('SDA_SBNo_C').text()).css({ 'color': 'red' });
                        $('#btnSubmit').attr('disabled', 'disabled');
                        $('#txtGroupId').attr('disabled', 'disabled');
                        $('#txPieces').attr('disabled', 'disabled');
                        $('#txtScaleWt').attr('disabled', 'disabled');
                        $('#ddlEquTrolley').attr('disabled', 'disabled');
                        $('#addButton').attr('disabled', 'disabled');
                        // $('#spnMsg').text('');
                        //$('#TextBoxesGroup').empty();
                        $('#TextBoxesGroup').hide();
                        //  $('#TextBoxDiv1m').empty();

                        removeRowOnChange();

                        $('#Pieces1').val('');
                        $('#Length1').val('');
                        $('#Width1').val('');
                        $('#Height1').val('');
                        // $('#ddlUnit1').val('');
                        $('#txtGroupId').val('');
                        $('#ddlEquTrolley').val('0');


                        $('#Pieces1').hide();
                        $('#Length1').hide();
                        $('#Width1').hide();
                        $('#Height1').hide();
                        //  $('#ddlUnit1').hide();

                        return;

                    } else {
                        $('#btnSubmit').removeAttr('disabled');
                        $('#txtGroupId').removeAttr('disabled');
                        $('#txPieces').removeAttr('disabled');
                        $('#txtScaleWt').removeAttr('disabled');
                        $('#ddlEquTrolley').removeAttr('disabled');
                        $('#addButton').removeAttr('disabled');
                        $('#spnMsg').text('');
                        $('#txtGroupId').focus();
                        $("#spnMsg").text('');

                        //$('Pieces1').val('');
                        //$('Length1').val('');
                        //$('Width1').val('');
                        //$('Height1').val('');
                        //$('ddlUnit1').val('');


                        $('#Pieces1').show();
                        $('#Length1').show();
                        $('#Width1').show();
                        $('#Height1').show();
                        $('#ddlUnit1').show();
                    }
                }
            }
        });
        //selectedAWBNo = $(this).find("option:selected").text();
        //GetAWBDetailsForULDOnChange(selectedAWBNo);
    });


    var $input;
    var formElements = new Array();
    $("#addButton").click(function () {
        var firstTextBox = parseInt($("#Pieces1").val())
        var CurrSumDImPcs = 0;
        var j = 0
        $('#TextBoxesGroup').find('input').each(function (i, input) {
            $input = $(input);
            $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
            formElements.push($input.val());
            if ($(input).attr('id') == "Pieces" + parseInt(j + 1)) {
                CurrSumDImPcs = CurrSumDImPcs + parseInt($input.val());
                j++;
            }
        });
        if ($input.val() == '') {
            $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
        } else {


            if ($('#txPieces').val() == CurrSumDImPcs) {
                errmsg = "Sum of packages are equal to entered packages.</br>";
                $.alert(errmsg);
                return;

            } else if (CurrSumDImPcs < $('#txPieces').val()) {

                nextValue = $('#txPieces').val() - CurrSumDImPcs;
                //$(this).find('HAWBNo').text();

                //var ids = [];
                //$('#TextBoxesGroup tr').each(function () {
                //    ids.push($(this).find('td:first-child input[type="text"]').attr('id'));
                //    console.log(ids)
                //})
                //$("#textpackges1").val(nextValue)
                dynamicTrCreate(nextValue);
            }
            else if (CurrSumDImPcs > $('#txPieces').val()) {
                errmsg = "Sum of dim packages are greater than remaining packages.</br>";
                $.alert(errmsg);
                return;
            }

        }

    });

    //$('#txtGroupId').blur(function () {
    //    $('#txPieces').focus();

    //});

    $('#txtGroupId').focus();

    //$('#txPieces').blur(function (event) {

    //    if ($("#txPieces").val() == '') {
    //        return;
    //    }

    //    if (parseInt($("#txPieces").val()) > parseInt(remPCS)) {

    //        $("#txPieces").val(remPCS);
    //        //errmsg = "Entered pieces should not be greater than remaining pieces.</br>";
    //        //$.alert(errmsg);
    //        $("#spnMsg").text("Entered pieces should not be greater than remaining pieces.").css({ 'color': 'red' });
    //        $("#txPieces").focus();
    //        return;

    //    } else {
    //        $("#spnMsg").text('');
    //    }

    //    if (parseInt($("#txPieces").val()) <= 0) {

    //        $("#txPieces").val(remPCS);
    //        $("#spnMsg").text('Entered pieces must be greater than 0.').css({ 'color': 'red' });
    //        //$.alert(errmsg);
    //        $("#txPieces").focus();
    //        return;

    //    }



    //    if (remPCS == '0') {

    //        //errmsg = "Entered Pieces are greater than remaining packages; Action canceled.</br>";
    //        //$.alert(errmsg);
    //        return;

    //    }



    //    if (IsBaggage != 'Y') {
    //        if (parseInt($("#txPieces").val()) > parseInt(RemainingPkg)) {
    //            $("body").mLoading('hide');
    //            errmsg = "Entered Package(s) " + $("#txPieces").val() + " must be less than or equal to remaining Package(s) " + RemainingPkg + "</br>";
    //            $.alert(errmsg);
    //            $(".alert_btn_ok").click(function () {
    //                $("#txPieces").focus();
    //            });
    //        }
    //        else
    //            GetRemainingPackgs();
    //    }
    //    else
    //        GetRemainingPackgs();
    //});


    $("#ddlEquTrolley").change(function () {
        _vlaueofTrolley = $('option:selected', this).val();
        _vlaueofTrolleytext = $('option:selected', this).text();

        //REFERENCE = _vlaueofTrolley.split(",")[0];
        //IDENTIFIER = _vlaueofTrolley.split(",")[1];

        _TLRowId = _vlaueofTrolley.split(",")[0];
        TrolleyGrossWt = _vlaueofTrolley.split(",")[1];
        TrolleyTareWt = _vlaueofTrolley.split(",")[2];

        var a = parseFloat($("#txtScaleWt").val());
        var b = parseFloat(TrolleyGrossWt);
        var x = (b + a).toFixed(3);
        if (x == "NaN") {
            x = '';
        } else {
            //var netWeight = parseInt($("#txtScaleWt").val()) - parseInt(REFERENCE)
            $("#NetWt").text(x);
            $('#TareWt').text(TrolleyGrossWt);
        }

    });




    $("#txtScanAWB").blur(function () {

        var str = $('#txtScanAWB').val();
        selectedAWBNo = str;

        //  _Value = $("option:selected", this).val();

        //sbno = _Value.split(",")[0];
        //awbid = _Value.split(",")[1];

        ConsignmentRowID = $('#txtScanAWB').val();
        $(_xmlDocTable).find('Table').each(function (index) {
            if (ConsignmentRowID == $(this).find('SDA_AWBNumber_C').text()) {
                if ($(this).find('SDA_AWBNumber_C').text() == ConsignmentRowID) {
                    SDA_SBNo_C = $(this).find('SDA_SBNo_C').text();
                    SDA_HAWBNo_C = $(this).find('SDA_HAWBNo_C').text();

                    $('#txtSBNo').val(SDA_SBNo_C);
                    $('#txtHAWB').val(SDA_HAWBNo_C);

                    $('#txPieces').val($(this).find('SDA_PackageCount_I').text());
                    //  $('#txtScaleWt').val($(this).find('SDA_GrossWt_I').text());
                    $('#txtScaleWt').val($(this).find('RemainingGrWt').text());
                    $('#txtCommodityType').val($(this).find('CommodityType').text());
                    var newSHC = $(this).find('SHCCodes').text();
                    $("#TextBoxDivforSHCCode").empty();
                    SHCSpanHtml(newSHC);
                    $('#txtGroupId').focus();

                    aaSDA_SBNo_C = SDA_SBNo_C;
                }
            }
        });

        //if ($("#txtScanAWB").val() != '') {
        //    var value = this.value;// parseInt(this.value, 10),
        //    dd = document.getElementById('ddlAWBNo'),
        //    index = 0;

        //    $.each(dd.options, function (i) {
        //        console.log(this.text);
        //        if (this.text == value) {
        //            index = i;
        //        }
        //    });

        //    dd.selectedIndex = index; // set selected option

        //    if (dd.selectedIndex == 0) {
        //        errmsg = "Please scan/enter valid HAWB No.";
        //        $.alert(errmsg);
        //        return;
        //    }
        //    console.log(dd.selectedIndex);
        //    $('#ddlHAWBNo').trigger('change');
        //    // GetAWBDetailsForULD($('#ddlULDNo').val())
        //}
    });

    // var stringos = 'ECC,PER,GEN,DGR,HEA,AVI,BUP,EAW,EAP';
    // SHCSpanHtml(stringos);
});


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
                console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";
    $("#TextBoxDivforSHCCode").html(spanStr);
    return spanStr;

}


function AutoChkCheck() {
    if ($('#chkAuto').is(':checked')) {
        $('#txPieces').attr('disabled', 'disabled');
        $('#btnSubmit').attr('disabled', 'disabled');
    }
    else {
        $('#txPieces').removeAttr('disabled');
        $('#btnSubmit').removeAttr('disabled');
        $('#txPieces').focus();
    }
}
//function piecesOnBlure() {


//    if (parseInt($("#txPieces").val()) > parseInt(remPCS)) {

//        $("#txPieces").val(remPCS);
//        errmsg = "Entered pieces should not be greater than remaining pieces.</br>";
//        $.alert(errmsg);
//        return;

//    }

//    //if (parseInt($("#txPieces").val()) <= 0) {

//    //    $("#txPieces").val(remPCS);
//    //    errmsg = "Entered pieces must be greater than 0.</br>";
//    //    $.alert(errmsg);
//    //    return;

//    //}



//    if (remPCS == '0') {

//        //errmsg = "Entered Pieces are greater than remaining packages; Action canceled.</br>";
//        //$.alert(errmsg);
//        return;

//    }



//    if (IsBaggage != 'Y') {
//        if (parseInt($("#txPieces").val()) > parseInt(RemainingPkg)) {
//            $("body").mLoading('hide');
//            errmsg = "Entered Package(s) " + $("#txPieces").val() + " must be less than or equal to remaining Package(s) " + RemainingPkg + "</br>";
//            $.alert(errmsg);
//            $(".alert_btn_ok").click(function () {
//                $("#txPieces").focus();
//            });
//        }
//        else
//            GetRemainingPackgs();
//    }
//    else
//        GetRemainingPackgs();

//}

function dynamicTrCreate(piecesValue) {

    // if (counter > 5) {
    //     //alert("Only 10 textboxes allow");
    //     return false;
    // }
    var newTextBoxDiv = $(document.createElement('tr'))
        .attr("id", 'TextBoxDiv' + counter);

    newTextBoxDiv.after().html('<td><input onkeyup="NumberOnly(event);" class="textpackges text-right"  name="textpackges' + parseInt(counter + 1) + '" id="Pieces' + parseInt(counter + 1) + '" onkeypress="MoveToLen(this);" type="text" /></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Length' + parseInt(counter + 1) + '" onkeypress="MoveToWid(this);"  type="text" /></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Width' + parseInt(counter + 1) + '" onkeypress="MoveToHei(this);"  type="text" /></td>' +
        '<td><input onkeyup="NumberOnly(event);" class="textpackges text-right" name="textpackges' + parseInt(counter + 1) + '" id="Height' + parseInt(counter + 1) + '"  type="text" /></td>' +
        '<td><select id="ddlUnit' + parseInt(counter + 1) + '"><option value="cm">cm</option><option value="inch">inch</option></select></td>' +
        '<td><button onclick="removeRow(' + counter + ');" type="button" id="btnAdd" style="background-color: red;" class=""><i class="glyphicon glyphicon-minus"></i></button></td>');


    var one = parseInt($("#Pieces1").val());
    var two = parseInt($("#Pieces2").val());
    var sumOfTwoTextBox = one + two;

    // if (parseInt($("#Pieces1").val()) == RemainingPkg) {
    //     errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
    //     $.alert(errmsg);

    // } else if (sumOfTwoTextBox == RemainingPkg) {
    //     $("#textpackges1").val(nextValue);
    //     errmsg = "Sum of packages are equal to entered packages; Action canceled.</br>";
    //     $.alert(errmsg);

    // } else {
    newTextBoxDiv.appendTo("#TextBoxesGroup");
    $("#textpackges1").val(nextValue);
    counter++;

    // }
    GetRemainingPackgs();
    $("#Pieces" + counter).focus();
}


function GetRemainingPackgs() {
    piecesTyped = parseInt($("#txPieces").val());
    $('#TextBoxesGroup').show();
    $("#TextBoxDiv1m").show();
    if ($("#ddlMAWBNo").val() == '0') {
        $("#txPieces").val('');
        errmsg = "Please select MAWB No.</br>";
        $.alert(errmsg);
        return;
    }
    //else if (RemainingPkg > piecesTyped) {
    //    actualVal = RemainingPkg - $("#txPieces").val();
    //    $("#textpackgesFirst").val(piecesTyped)
    //} else if (RemainingPkg == piecesTyped) {
    //    $("#textpackgesFirst").val(RemainingPkg);
    //} else if (RemainingPkg < piecesTyped) {
    //    $("#textpackgesFirst").val(RemainingPkg);
    //    $("#txPieces").val(RemainingPkg);
    //    errmsg = "Enterd Package(s) must be less than or equal to remaining Package(s)</br>";
    //    $.alert(errmsg);
    //}


    var rpkg = piecesTyped;
    $('#TextBoxesGroup tr').each(function () {

        $(this).find("input").each(function () {

            ItemCode = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('Pieces') != -1) {
                // inputRows += "<Pieces>" + ItemCode + "</Pieces>"
                if ($(this).val() != "") {
                    rpkg = rpkg - parseInt($(this).val());

                }
                else {
                    $(this).val(rpkg);

                }
            }

        });

    });

}

getAllValues = function () {

    inputRows = "";
    TotalvolumatricChWt = 0;
    $('#TextBoxesGroup tr').each(function () {
        volumatricChWt = 0;

        var p, l, w, h;

        inputRows += "<Dims"
        $(this).find("input").each(function () {

            ItemCode = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('Pieces') != -1) {
                inputRows += " P=" + '"' + ItemCode + '"'
                p = ItemCode;
            }
            else if (id.toString().indexOf('Length') != -1) {
                inputRows += " L=" + '"' + ItemCode + '"'
                l = ItemCode;
            }
            else if (id.toString().indexOf('Width') != -1) {
                inputRows += " W=" + '"' + ItemCode + '"'
                w = ItemCode;
            }
            else if (id.toString().indexOf('Height') != -1) {
                inputRows += " H=" + '"' + ItemCode + '"'
                h = ItemCode;
            }



            //else if (id.toString().indexOf('Unit') != -1) {
            //    inputRows += " U = " + ItemCode
            //}
            //else if (id.toString().indexOf('VolumetricWt') != -1) {
            //    inputRows += " V = " + ItemCode
            //}
        });

        $(this).find("select").each(function () {

            ItemCodeSelect = $(this).val();
            var id = $(this).attr('id');

            if (id.toString().indexOf('ddlUnit') != -1) {
                // inputRows += " H=" + '"' + ItemCode + '"'
                inputRows += " U=" + '"' + ItemCodeSelect + '"'
            }



            if (ItemCodeSelect == 'inch') {

                volumatricChWt = (l * w * h * (p / 366));

            } else if (ItemCodeSelect == 'cm') {
                volumatricChWt = (l * w * h * (p / 6000));
            }

            TotalvolumatricChWt += volumatricChWt.toFixed(2);

        });


        inputRows += " V=" + '"' + volumatricChWt.toFixed(3) + '"'
        inputRows += "/>";
    });
}
//"<DimsP =2L =2W = 2H =2/>"
function GetULDDetailsforVCT() {

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    $('#ddlULDNo').empty();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CargoWorksServiceURL + "GetVCTULDDetail",
            data: JSON.stringify({
                'strVCTNo': $('#txtVCTNo').val(), 'strCompanyCode': CompanyCode, 'strAirportCity': AirportCity, 'strShedCode': SHEDCODE, 'strUserId': UserId,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(xmlDoc).find('Table').each(function (index) {

                    var ULDId;
                    var ULD;
                    ULDId = $(this).find('ULDSeqNo').text();
                    ULD = $(this).find('ULDNo').text();

                    var newOption = $('<option></option>');
                    newOption.val(ULDId).text(ULD);
                    newOption.appendTo('#ddlULDNo');

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function GetTrolleyListDetails_HHT() {

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    $('#ddlEquTrolley').empty();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "GetTrolleyListDetails_HHT",
            data: JSON.stringify({}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(xmlDoc).find('Table').each(function (index) {


                    TLRowId = $(this).find('TLRowId').text();
                    TrolleyNo = $(this).find('TrolleyNo').text();
                    TrolleyGrossWt = $(this).find('TrolleyGrossWt').text();
                    TrolleyTareWt = $(this).find('TrolleyTareWt').text();


                    if (index == 0 && $("#ddlEquTrolley").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlEquTrolley');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(TLRowId + ',' + TrolleyGrossWt + ',' + TrolleyGrossWt).text(TrolleyNo);
                    newOption.appendTo('#ddlEquTrolley');

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function GetAWBSBDetail_HHT(VCTNo) {
    $('#ddlAWBNo').empty();
    $('#Pieces1').val('');
    $('#Length1').val('');
    $('#Width1').val('');
    $('#Height1').val('');
    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';



    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "GetAWBSBDetail_HHT",
            data: JSON.stringify({
                'pi_strAWBNumber': "", 'pi_strVCTNo': VCTNo
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                _xmlDocTable = xmlDoc;
                $("body").mLoading('hide');
                $(xmlDoc).find('Table').each(function (index) {

                    var ULDId;
                    var ULD;
                    AL_ROWID_I = $(this).find('AL_ROWID_I').text();
                    SDA_ROWID_I = $(this).find('SDA_ROWID_I').text();
                    SDA_SBNo_C = $(this).find('SDA_SBNo_C').text();
                    SDA_AWBNumber_C = $(this).find('SDA_AWBNumber_C').text();
                    SDA_HAWBNo_C = $(this).find('SDA_HAWBNo_C').text();
                    SDA_PackageCount_I = $(this).find('SDA_PackageCount_I').text();
                    SDA_GrossWt_I = $(this).find('SDA_GrossWt_I').text();
                    SDA_TimeStamp_Dt = $(this).find('SDA_TimeStamp_Dt').text();
                    SDA_LockStatus_I = $(this).find('SDA_LockStatus_I').text();
                    SDA_IsManaual_B = $(this).find('SDA_IsManaual_B').text();
                    SDA_SBDate = $(this).find('SDA_SBDate').text();


                  

                    if (index == 0 && $("#ddlAWBNo").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlAWBNo');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(SDA_SBNo_C).text(SDA_AWBNumber_C + ' (SB No: ' + SDA_SBNo_C + ')');
                    newOption.appendTo('#ddlAWBNo');

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function returnToBack() {

    window.localStorage.setItem("_vctno", VCTNo);
    window.localStorage.setItem("flag", 1);
    window.localStorage.setItem("_Door", Door);

    location.href = 'EXP_EuroPalletAcceptance.html';

}



function GetAWBDetailsForULDOnChange(_AWBNo) {

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';



    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "GetAWBSBDetail_HHT",
            data: JSON.stringify({
                'pi_strAWBNumber': _AWBNo, 'pi_strVCTNo': ''
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                $("body").mLoading('hide');
                $(xmlDoc).find('Table').each(function (index) {

                    //var AWBId;
                    //var AWB;
                    //AWBId = $(this).find('AWBNo').text();
                    //AWB = $(this).find('AWBNo').text();

                    //var newOption = $('<option></option>');
                    //newOption.val(AWBId).text(AWB);
                    //newOption.appendTo('#ddlAWBNo');

                    AL_ROWID_I = $(this).find('AL_ROWID_I').text();
                    SDA_ROWID_I = $(this).find('SDA_ROWID_I').text();
                    SDA_SBNo_C = $(this).find('SDA_SBNo_C').text();
                    SDA_AWBNumber_C = $(this).find('SDA_AWBNumber_C').text();
                    SDA_HAWBNo_C = $(this).find('SDA_HAWBNo_C').text();
                    SDA_PackageCount_I = $(this).find('SDA_PackageCount_I').text();
                    SDA_GrossWt_I = $(this).find('SDA_GrossWt_I').text();
                    SDA_TimeStamp_Dt = $(this).find('SDA_TimeStamp_Dt').text();
                    SDA_LockStatus_I = $(this).find('SDA_LockStatus_I').text();
                    SDA_IsManaual_B = $(this).find('SDA_IsManaual_B').text();
                    SDA_SBDate = $(this).find('SDA_SBDate').text();


                    $('#txtSBNo').val(SDA_SBNo_C)
                    $('#txtHAWB').val(SDA_HAWBNo_C)




                    //txtSBNo
                    //txtHAWB
                    //txtGroupId
                    //txtPieces
                    //txtGrossWt

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }

}

function GetShipmentDetails(AWBid) {

    var inputxml = "";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    //inputxml = '<Root><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UlDSeqNo></UlDSeqNo><AirportCity>' + AirportCity + '</AirportCity></Root>';

    $('#ddlShipmentNo').empty();

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CargoWorksServiceURL + "GetVCTULDAWBDetail",
            data: JSON.stringify({
                'strAWBNo': AWBid, 'CompanyCode': CompanyCode, 'strAirportCity': AirportCity, 'strCycle': 'E',
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                $(xmlDoc).find('Table').each(function (index) {

                    Packages = $(this).find('NOP').text();
                    GrossWt = $(this).find('WEIGHT_KG').text();

                    $('#txtPackages').val('Packages');
                    $('#txtGrossWt').val('GrossWt');

                    var ShpmentId;
                    var ShpmentNo;
                    ShpmentId = $(this).find('SHIPMENT_NUMBER').text();
                    ShpmentNo = $(this).find('SHIPMENT_NUMBER').text();

                    var newOption = $('<option></option>');
                    newOption.val(ShpmentId).text(ShpmentNo);
                    newOption.appendTo('#ddlShipmentNo');

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }


}

function onFocusChangeGrpID() {
    if ($('#txtGroupId').val().length == 14) {
        $('#txPieces').focus();
    } else {
        $('#txPieces').focus();
    }
}


function CreateTDGAcceptance_SB_HHT() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    //var strAWBNo = $('#ddlAWBNo').find('option:selected').text();
    //var strPkgs = $('#txtPackages').val();
    //var strGrossWt = $('#txtGrossWt').val();
    //var strLocationCode = $('#txtLocation').val();
    //var strShipmentNo = $('#ddlShipmentNo').find('option:selected').text();
    //var strWtUnit = 'KG';

    //var receive = '1';

    //if (document.getElementById('chkReceive').checked) {
    //    receive = '1';
    //} else {
    //    receive = '0';
    //}


    //if (strAWBNo == "" || strPkgs == "" || strGrossWt == "" || strLocationCode) {

    //    errmsg = "Please enter all the required fields.</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    //if (strAWBNo.length != '11') {
    //    errmsg = "Please enter valid AWB No.";
    //    $.alert(errmsg);
    //    return;
    //}
    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var t = formattedDate.getTime();
    var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    getAllValues();


    if (selectedAWBNo == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/select MAWB No.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtGroupId').val() == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter group Id.').css({ 'color': 'red' });
        $('#txtGroupId').focus();
        return;
    } else {
        $("#spnMsg").text('');
    }

    if (parseInt($("#txPieces").val()) <= 0) {

        $("#txPieces").val(remPCS);
        //errmsg = "Entered pieces must be greater than 0.</br>";
        //$.alert(errmsg);
        $("#spnMsg").text('Entered pieces must be greater than 0.').css({ 'color': 'red' });
        return;

    } else {
        $("#spnMsg").text('');
    }

    if ($('#txPieces').val() == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter pieces').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    if ($('#txtScaleWt').val() == "") {
        //errmsg = "Please enter valid flight No.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please enter gross wt.').css({ 'color': 'red' });
        return;
    } else {
        $("#spnMsg").text('');
    }

    //if ($('#ddlEquTrolley').val() == "0") {
    //    //errmsg = "Please enter valid flight No.";
    //    //$.alert(errmsg);
    //    $("#spnMsg").text('Please select trolley.').css({ 'color': 'red' });
    //    return;
    //} else {
    //    $("#spnMsg").text('');
    //}



    var $input;
    var formElements = new Array();
    var firstTextBox = parseInt($("#Pieces1").val())
    var CurrSumDImPcs = 0;
    var j = 0
    $('#TextBoxesGroup').find('input').each(function (i, input) {
        $input = $(input);
        $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
        formElements.push($input.val());
        if ($(input).attr('id') == "Pieces" + parseInt(j + 1)) {
            CurrSumDImPcs = CurrSumDImPcs + parseInt($input.val());
            j++;
        }
    });
    var CurrSumDImPcs = 0;
    var j = 0
    $('#TextBoxesGroup').find('input').each(function (i, input) {
        $input = $(input);
        $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
        formElements.push($input.val());
        if ($(input).attr('id') == "Pieces" + parseInt(j + 1)) {
            CurrSumDImPcs = CurrSumDImPcs + parseInt($input.val());
            j++;
        }
    });
    if ($input.val() == '') {
        $input.css('background-color', $input.val() ? 'white' : '#FFCCCB');
        $("#spnMsg").text('Please enter dimensions.').css({ 'color': 'red' });
        $("#Length1").focus();

        return;
    } else {
        $("#spnMsg").text('');
        if (CurrSumDImPcs > $('#txPieces').val()) {
            errmsg = "Sum of dim packages are greater than remaining packages.</br>";
            $.alert(errmsg);
            return;
        }

    }

    indo = inputRows.replace(/\\/g, '')
    var param = 'pi_strGroupID =' + $('#txtGroupId').val().toUpperCase() + '  ' +
        'pi_intRemPkgs =' + $('#txPieces').val() + '  ' +
        'pi_dcmlRemGrWt =' + $('#txtScaleWt').val() + '  ' +
        'pi_dcmlTDGchrgWt =' + volumatricChWt.toFixed(3) + '  ' +
        'pi_intEquipmentId =' + _TLRowId + '  ' +
        'pi_strRemarks =' + '' + '  ' +
        'pi_strAWBNo =' + selectedAWBNo + '  ' +
        'pi_strSBNo = ' + aaSDA_SBNo_C + '  ' +
        'pi_dtTDGDate =' + newDate + '  ' +
        'pi_xmlSBDimensions =' + '<top>' + inputRows + '</top>' + '  ' +
        'pi_strUserName =' + UserName + '  ' +
        'pi_strVCTNo = ' + VCTNo

    pi_strGroupID = $('#txtGroupId').val().toUpperCase();
    pi_intRemPkgs = $('#txPieces').val();
    pi_dcmlRemGrWt = $('#txtScaleWt').val();
    pi_dcmlTDGchrgWt = volumatricChWt.toFixed(3);
    pi_intEquipmentId = _TLRowId;
    pi_strRemarks = '';
    pi_strAWBNo = selectedAWBNo;
    pi_strSBNo = aaSDA_SBNo_C
    pi_dtTDGDate = newDate
    pi_xmlSBDimensions = '<top>' + inputRows + '</top>';
    pi_strUserName = UserName;
    pi_strVCTNo = VCTNo;


    //<pi_strGroupID>string</pi_strGroupID>
    //  <pi_intRemPkgs>int</pi_intRemPkgs>
    //  <pi_dcmlRemGrWt>decimal</pi_dcmlRemGrWt>
    //  <pi_dcmlTDGchrgWt>decimal</pi_dcmlTDGchrgWt>
    //  <pi_intEquipmentId>int</pi_intEquipmentId>
    //  <pi_strRemarks>string</pi_strRemarks>
    //  <pi_strAWBNo>string</pi_strAWBNo>
    //  <pi_strSBNo>string</pi_strSBNo>
    //  <pi_dtTDGDate>dateTime</pi_dtTDGDate>
    //  <pi_xmlSBDimensions>string</pi_xmlSBDimensions>
    //  <pi_strUserName>string</pi_strUserName>


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "CreateTDGAcceptance_SB_HHT ",
            data: JSON.stringify({
                'pi_strGroupID': pi_strGroupID,
                'pi_intRemPkgs': pi_intRemPkgs,
                'pi_dcmlRemGrWt': pi_dcmlRemGrWt,
                'pi_dcmlTDGchrgWt': pi_dcmlTDGchrgWt,
                'pi_intEquipmentId': pi_intEquipmentId,
                'pi_strRemarks': '',
                'pi_strAWBNo': pi_strAWBNo,
                'pi_strSBNo': pi_strSBNo,
                'pi_dtTDGDate': newDate,
                'pi_xmlSBDimensions': pi_xmlSBDimensions,
                'pi_strUserName': pi_strUserName,
                'pi_strVCTNo': pi_strVCTNo

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
                Result = response.d;
                // var xmlDoc = $.parseXML(Result);
                if (Result == '') {
                    clearALL();
                    $('#spnMsg').text('TDG acceptance done successfully').css('color', 'green');
                    GetAWBSBDetail_HHT(VCTNo);
                } else {

                    $('#spnMsg').text(Result).css('color', 'red');
                }


                //window.location.reload();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                // $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}



function clearALL() {
    $('#txtSBNo').val('');
    $('#txtHAWB').val('');
    $('#txtGroupId').val('');
    $('#txPieces').val('');
    $('#txtScaleWt').val('');
    $('#ddlEquTrolley').val(0);
    $('#ddlAWBNo').val(0);

    //
    selectedAWBNo = '';
    $('#btnSubmit').attr('disabled', 'disabled');
    $('#txtGroupId').attr('disabled', 'disabled');
    $('#txPieces').attr('disabled', 'disabled');
    $('#txtScaleWt').attr('disabled', 'disabled');
    $('#ddlEquTrolley').attr('disabled', 'disabled');
    $('#addButton').attr('disabled', 'disabled');

    // $('#TextBoxesGroup').empty();
    $('#TextBoxesGroup').hide();
    // $('#TextBoxDiv1m').empty();
    $("#TextBoxDivforSHCCode").empty();
    $('Pieces1').val('');
    $('Length1').val('');
    $('Width1').val('');
    $('Height1').val('');
    $('ddlUnit1').val('');


    $('#Pieces1').hide();
    $('#Length1').hide();
    $('#Width1').hide();
    $('#Height1').hide();
    $('#ddlUnit1').hide();

    $('#txtManiPieces').val('');
    $('#txtReceivePieces').val('');
    $('#txtManiGrWt').val('');
    $('#txtReceiveGrWt').val('');
    $('#txtShortPieces').val('');
    $('#txtExcessPieces').val('');
    $('#txtDamagePieces').val('');


    $('#NetWt').text('');
    $('#TareWt').text('');
    $('#lblVCTNo').text('');
    $('#spnMsg').text('');

}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}

function MoveToLen(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Length' + index).focus();
    }
}

function MoveToWid(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Width' + index).focus();
    }
}

function MoveToHei(Pcsobj) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var PcsId = $(Pcsobj).attr('id');
        var index = PcsId.charAt(PcsId.length - 1);
        $('#Height' + index).focus();
    }
}


function removeRow(rowID) {
    //if (counter == 1) {
    //    alert("No more textbox to remove");
    //    return false;
    //}

    var lenRow = $('#TextBoxesGroup tbody tr').length;
    //alert(lenRow);
    if (lenRow == 1 || lenRow <= 1) {
        alert("Can't remove all row!");
    } else {
        $("#TextBoxDiv" + rowID).remove();
    }

    //counter--;

    //$("#TextBoxDiv" + counter).remove();
}

function removeRowOnChange() {
    //if (counter == 1) {
    //    alert("No more textbox to remove");
    //    return false;
    //}

    counter--;

    $("#TextBoxDiv" + counter).remove();
}
