var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserID = window.localStorage.getItem("UserID");
var companyCode = window.localStorage.getItem("companyCode");
var UserName = window.localStorage.getItem("UserName");
var AWB_Number = localStorage.getItem('AWB_Number');
var HAWB_Number = localStorage.getItem('HAWB_Number');
var Flight_Seq_No = localStorage.getItem('Flight_Seq_No');
var increamentVal = 1;
var _xmlDocTable;
var i = 1;
var AIRLINE_PREFIX;
var AWB_NUMBER;
var BOOKED_FLIGHT_SEQUENCE_NUMBER;
var IMPAWBROWID;
var IMPSHIPROWID;
var _DamageDataXML2, _ShipTotalPcsXML2, _PackagingXML3, _OuterPackingXML4, _InnerPackingXML5, _IsSufficientXML6;
var _DamageObserContainersXML7, _SpaceForMissingXML8, _SpaceForMissingXML9, _DamageRemarkedXML10, _DispositionXML11;
$(document).ready(function () {

    if (localStorage.getItem('AWB_Number') != null && localStorage.getItem('HAWB_Number') != null && localStorage.getItem('Flight_Seq_No')) {
        $("#txtAWBNo").val(localStorage.getItem('AWB_Number'));
        $("#ddlHAWB").val(localStorage.getItem('HAWB_Number'));
        $("#ddlFlightNo").val(localStorage.getItem('Flight_Seq_No'));
    }

    $("#hawbLists").blur(function () {

        if ($("#hawbLists").val() != '') {
            var value = this.value;// parseInt(this.value, 10),
            dd = document.getElementById('ddlHAWBNo'),
                index = 0;

            $.each(dd.options, function (i) {
                console.log(this.text);
                if (this.text == value) {
                    index = i;
                }
            });

            dd.selectedIndex = index; // set selected option

            if (dd.selectedIndex == 0) {
                // errmsg = "Please scan/enter valid HAWB No.";
                // $.alert(errmsg);
                $('#successMsg').text('Please scan/enter valid HAWB No.').css('color', 'red');
                return;
            }
            console.log(dd.selectedIndex);
            $('#successMsg').text('');
            $('#ddlHAWBNo').trigger('change');


            // GetAWBDetailsForULD($('#ddlULDNo').val())
        }
    });

    $('#closeButton').click(function () {
        // $('#myModal').modal('toggle');
        location.reload();
        $('#myModal').show();
    });



    $(".next").click(function () {

        var typeofDisvalues;
        if (increamentVal == 1) {

            $('#divTypeofdiscrepancy').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    typeofDisvalues = $(this).attr('id');
                    console.log(typeofDisvalues)
                });
            });
        }

        if (increamentVal == 2) {
            $('#divTypeofdiscrepancy').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    typeofDisvalues = $(this).attr('id');
                    console.log(typeofDisvalues)
                });
            });

            if ($('#txtPckgsEXP').val() == '' && $('#txtPckgsRCV').val() == '') {
                $('#emMsg').text('Please enter damage Pcs. and Wt.').css('color', 'red');
                //alert('Please enter damage Pcs. and Wt.');
                return;
            } else {
                $('#emMsg').text('');
            }
            _DamageDataXML2 = '<AwbPrefix>' + AIRLINE_PREFIX + '</AwbPrefix><AwbNumber>' + AWB_NUMBER + '</AwbNumber><AWBId>' + IMPAWBROWID + '</AWBId><SHIPId>' + IMPSHIPROWID + '</SHIPId>' +
                '<FlightSeqNo>' + BOOKED_FLIGHT_SEQUENCE_NUMBER + '</FlightSeqNo ><HouseSeqNo>0</HouseSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode><UserID>' + UserID + '</UserID>' +
                '<TypeOfDiscrepancy>' + typeofDisvalues + '</TypeOfDiscrepancy>';

            _ShipTotalPcsXML2 = '<ShipTotalPcs>' + $('#lblNPX').text() + '</ShipTotalPcs><ShipTotalWt>' + $('#lblWtExp').text() + '</ShipTotalWt><ShipDamagePcs>' + $('#txtPckgsEXP').val() + '</ShipDamagePcs><ShipDamageWt>' + $('#txtPckgsRCV').val() + '</ShipDamageWt>' +
                '<ShipDifferencePcs>' + $('#lblNPR').text() + '</ShipDifferencePcs><ShipDifferenceWt>' + $('#lblWtRec').text() + '</ShipDifferenceWt>' +
                '<IndividualWTPerDoc>' + $('#txtPckgsFoundWtEXP').val() + '</IndividualWTPerDoc><IndividualWTActChk>' + $('#txtPckgsFoundWtEXP').val() + '</IndividualWTActChk><IndividualWTDifference>' + $('#txtPckgsFoundWt').text() + '</IndividualWTDifference>';
            console.log(_DamageDataXML2)
            console.log(_ShipTotalPcsXML2)
        }

        if (increamentVal == 3) {
            var Materialvalues = [];

            $('#divChkMaterial').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Materialvalues.push($(this).attr('id'));
                });
            });
            var MaterialVal = Materialvalues.join(",");

            var Typevalues = [];
            $('#divType').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Typevalues.push($(this).attr('id'));
                });
            });
            var TypelVal = Typevalues.join(", ");

            var MarkanLabelvalues = [];
            $('#divMarkanLabel').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    MarkanLabelvalues.push($(this).attr('id'));
                });
            });
            var MarkanLabelVal = MarkanLabelvalues.join(",");

            var OuterPackingvalues = [];
            $('#divOuterPacking').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    OuterPackingvalues.push($(this).attr('id'));
                });
            });
            var OuterPackingVal = OuterPackingvalues.join(",");

            _PackagingXML3 = '<ContainerMaterial>' + MaterialVal + '</ContainerMaterial><ContainerType>' + TypelVal + '</ContainerType>' +
                '<MarksLabels>' + MarkanLabelVal + '</MarksLabels>';
            console.log(_PackagingXML3)
        }

        if (increamentVal == 4) {

            var OuterPackingvalues = [];
            $('#divOuterPacking').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    OuterPackingvalues.push($(this).attr('id'));
                });
            });
            var OuterPackingVal = OuterPackingvalues.join(",");

            _OuterPackingXML4 = '<OuterPacking>' + OuterPackingVal + '</OuterPacking>';
            console.log(_OuterPackingXML4)
        }

        if (increamentVal == 5) {
            var InnerPackingvalues = [];
            $('#divInnerPacking').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    InnerPackingvalues.push($(this).attr('id'));
                });
            });
            var InnerPackingVal = InnerPackingvalues.join(",");
            _InnerPackingXML5 = '<InnerPacking>' + InnerPackingVal + '</InnerPacking>';
            console.log(_InnerPackingXML5)

        }

        if (increamentVal == 6) {
            var DetalofDamageObservedvalues = [];
            var isPackRadiovalues = [];

            $('#isPackRadio').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    isPackRadiovalues.push($(this).attr('id'));
                });
            });

            $('#divDetalofDamageObserved').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    DetalofDamageObservedvalues.push($(this).attr('id'));
                });
            });
            var DetalofDamageObservedVal = DetalofDamageObservedvalues.join(", ");

            _IsSufficientXML6 = '<IsSufficient>' + isPackRadiovalues + '</IsSufficient><DamageObserContent>' + DetalofDamageObservedVal + '</DamageObserContent>';
            console.log(_IsSufficientXML6)
        }

        if (increamentVal == 7) {
            var Containersvalues = [];

            $('#divContainers').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Containersvalues.push($(this).attr('id'));
                });
            });
            var ContainersVal = Containersvalues.join(",");

            var DamageDiscoveredvalues = [];

            $('#divDamageDiscovered').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    DamageDiscoveredvalues.push($(this).attr('id'));
                });
            });
            var DamageDiscoveredVal = DamageDiscoveredvalues.join(",");

            _DamageObserContainersXML7 = '<DamageObserContainers>' + ContainersVal + '</DamageObserContainers>' +
                '<DamageDiscovered>' + DamageDiscoveredVal + '</DamageDiscovered>';
            console.log(_DamageObserContainersXML7)
        }

        if (increamentVal == 8) {
            var Spacemissingvalues = [];

            $('#divrbtSpacemissing').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Spacemissingvalues.push($(this).attr('id'));
                });
            });


            var Inviocevalues = [];

            $('#divrbtInvioce').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Inviocevalues.push($(this).attr('id'));
                });
            });


            var WeatherConditionvalues = [];

            $('#divWeatherCondition').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    WeatherConditionvalues.push($(this).attr('id'));
                });
            });
            var WeatherConditionVal = WeatherConditionvalues.join(", ");

            var DamageApparentlycausedbyvalues = [];

            $('#divTheDamageApparentlycausedby').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    DamageApparentlycausedbyvalues.push($(this).attr('id'));
                });
            });
            var DamageApparentlycausedbyVal = DamageApparentlycausedbyvalues.join(",");
            _SpaceForMissingXML8 = '<SpaceForMissing>' + Spacemissingvalues + '</SpaceForMissing><VerifiedInvoice>' + Inviocevalues + '</VerifiedInvoice><WeatherCondition>' + WeatherConditionVal + '</WeatherCondition><AparentCause>' + DamageApparentlycausedbyVal + '</AparentCause>';
            console.log(_SpaceForMissingXML8)
        }

        if (increamentVal == 9) {
            if ($('#txtAreaRemarkincase').val() == '') {
                $('#emMsgRem').text('Please enter remark.').css('color', 'red');
                //alert('Please enter damage Pcs. and Wt.');
                return;
            } else {
                $('#emMsgRm').text('');
            }
            var Evidancevalues = [];

            $('#divrbtEvidance').each(function () {
                $(this).find("input[type='radio']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    Evidancevalues.push($(this).attr('id'));
                });
            });

            var SalvageActionvalues = [];

            $('#divSalvageAction').each(function () {
                $(this).find("input[type='checkbox']:checked").each(function () {
                    /* var id = $(this).attr('id');*/
                    SalvageActionvalues.push($(this).attr('id'));
                });
            });

            var SalvageActionVal = SalvageActionvalues.join(",");

            _DamageRemarkedXML10 = '<DamageRemarked>' + $('#txtExactWording').val() + '</DamageRemarked><EvidenceOfPilerage>' + Evidancevalues + '</EvidenceOfPilerage><Remarks>' + $('#txtAreaRemarkincase').val() + '</Remarks><SalvageAction>' + SalvageActionVal + '</SalvageAction>';
            console.log(_DamageRemarkedXML10)
        }


        //Show previous button

        $('.pre').show();

        //Find the element that's currently showing
        $showing = $('.content .first.visible').first();

        //Find the next element
        $next = $showing.next();

        //Change which div is showing
        $showing.removeClass("visible").hide();
        $next.addClass("visible").show();

        //If there's no more elements, hide the NEXT button
        if (!$next.next().length) {
            $(this).hide();
        }
        i++;
        increamentVal = i;
        console.log(increamentVal);
    });

    $(".pre").click(function () {
        $('.next').show();

        $showing = $('.content .first.visible').first();
        $next = $showing.prev();
        $showing.removeClass("visible").hide();
        $next.addClass("visible").show();

        if (!$next.prev().length) {
            $(this).hide();
        }
        i--;
        increamentVal = i;
        console.log(increamentVal);
    });

    $('#btnRecordDamage').click(function () {

        //if (increamentVal == 11) {

        var Dispositionvalues = [];

        $('#divSalvageAction').each(function () {
            $(this).find("input[type='radio']:checked").each(function () {
                /* var id = $(this).attr('id');*/
                Dispositionvalues.push($(this).attr('id'));
            });
        });

        var Disposition = Dispositionvalues.join(", ");

        _DispositionXML11 = '<Disposition>' + Disposition + '</Disposition><GHARepresent>' + $('#txtGHARepresentative').val() + '</GHARepresent><AirlineRepresent>' + $('#txtAirlineRepresentative').val() + '</AirlineRepresent>' +
            '<SecurityRepresent>' + $('#txtSecurityRepresentative').val() + '</SecurityRepresent><ProblemSeqId></ProblemSeqId>';


        var finalXML = '<ROOT><DamageData>' + _DamageDataXML2 + _ShipTotalPcsXML2 + _PackagingXML3 + _OuterPackingXML4 + _InnerPackingXML5 + _IsSufficientXML6 +
            _DamageObserContainersXML7 + _SpaceForMissingXML8 + _DamageRemarkedXML10 + _DispositionXML11 + '</DamageData></ROOT>';
        console.log(finalXML);
        SaveImportDamageRecordDetails(finalXML);


        $('#txtAreaRemark').val($('#txtAreaRemarkincase').val())
        $('#myModal').modal('toggle');
        // }
    });

});// JavaScript source code



function CheckEmpty() {

    if ($('#txtGroupId').val() != '' && $('#txtLocation').val() != '') {
        $('#btnMoveDetail').removeAttr('disabled');
    } else {
        $('#btnMoveDetail').attr('disabled', 'disabled');
        return;
    }

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
                // console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                // console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}

function GetImportHouseNoByAWBNo() {


    $('#ddlHAWB').empty();
    $('#ddlFlightNo').empty();
    $('#txtAreaRemark').val('');

    if ($("#txtScanAWBNo").val() == '') {
        return;
    }

    if ($("#txtScanAWBNo").val().length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        $('#txtScanAWBNo').val('');
        $('#txtScanAWBNo').focus();
        return;
    }
    $('#txtAWBNo').val($("#txtScanAWBNo").val());
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    InputXML = '<Root><AWBNo>' + $("#txtScanAWBNo").val() + '</AWBNo><AirportCity>' + AirportCity + '</AirportCity></Root>';
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetImportHouseNoByAWBNo",
            data: JSON.stringify({ 'InputXML': InputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                //$('#divVCTDetail').html('');
                console.log(xmlDoc)
                $('#ddlHAWB').empty();


                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $.alert(StrMessage);
                        $('#txtAWBNo').val('');
                        $('#txtAWBNo').focus();
                        return;
                    }
                });
                $(xmlDoc).find('Table1').each(function (index) {
                    var MAWB_IND;
                    var HOUSE_NUMBER;
                    var IMPAWBROWID;
                    MAWB_IND = $(this).find('MAWB_IND').text();
                    HOUSE_NUMBER = $(this).find('HOUSE_NUMBER').text();
                    IMPAWBROWID = $(this).find('IMPAWBROWID').text();
                    if (index == 0 && $("#ddlHAWBNo").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlHAWBNo');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(IMPAWBROWID).text(HOUSE_NUMBER);
                    newOption.appendTo('#ddlHAWBNo');


                });


            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
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


function GetImportFlightDetailsByAWBId(AWBID) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    InputXML = '<Root><AWBId>' + AWBID + '</AWBId><AirportCity>' + AirportCity + '</AirportCity></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImportFlightDetailsByAWBId",
            data: JSON.stringify({
                'InputXML': InputXML,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                $("body").mLoading('hide');
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                console.log(xmlDoc);
                $('#ddlFlightNo').empty();
                $(xmlDoc).find('Table1').each(function (index) {

                    FLIGHT_NUMBER_Date = $(this).find('FLIGHT_NUMBER_Date').text();
                    BOOKED_FLIGHT_SEQUENCE_NUMBER = $(this).find('BOOKED_FLIGHT_SEQUENCE_NUMBER').text();
                    IMPAWBROWID = $(this).find('IMPAWBROWID').text();
                    IMPSHIPROWID = $(this).find('IMPSHIPROWID').text();
                    if (index == 0) {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlFlightNo');
                    }
                    var newOption = $('<option></option>');
                    newOption.val(BOOKED_FLIGHT_SEQUENCE_NUMBER + '~' + IMPAWBROWID + '~' + IMPSHIPROWID).text(FLIGHT_NUMBER_Date);
                    newOption.appendTo('#ddlFlightNo');

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
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


function clickOnNextButton() {
    if ($('#txtAWBNo').val() == '') {
        $.alert('Please enter AWB No.');
        return;
    }

    if ($('#ddlHAWB').val() == '0') {
        $.alert('Please select checklist.');
        return;
    }

    if ($('#ddlFlightNo').val() == '0') {
        $.alert('Please select flight No / Date.');
        return;
    }

    localStorage.setItem('AWB_Number', $('#txtAWBNo').val());
    localStorage.setItem('HAWB_Number', $('#ddlHAWB').val());
    localStorage.setItem('Flight_Seq_No', $('#ddlFlightNo').val());

    window.location.href = 'IMP_RecordDamage_Options.html';
}

function GetImportDamageRecordDetails(flightSeqNo) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var valuesOfAll = flightSeqNo.split('~');

    BOOKED_FLIGHT_SEQUENCE_NUMBER = valuesOfAll[0];
    IMPAWBROWID = valuesOfAll[1];
    IMPSHIPROWID = valuesOfAll[2];

    console.log(BOOKED_FLIGHT_SEQUENCE_NUMBER + '/' + IMPAWBROWID + '/' + IMPSHIPROWID)

    InputXML = '<Root><AWBId>' + IMPAWBROWID + '</AWBId><SHIPId>' + IMPSHIPROWID + '</SHIPId><FlightSeqNo>' + BOOKED_FLIGHT_SEQUENCE_NUMBER + '</FlightSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + companyCode + '</CompanyCode></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImportDamageRecordDetails",
            data: JSON.stringify({
                'InputXML': InputXML,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (Result) {
                $("body").mLoading('hide');
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);
                console.log(xmlDoc);
                $(xmlDoc).find('Table1').each(function (index) {

                    AIRLINE_PREFIX = $(this).find('AIRLINE_PREFIX').text();
                    AWB_NUMBER = $(this).find('AWB_NUMBER').text();

                    $('#lblAWBNoForShow').text($(this).find('AIRLINE_PREFIX').text() + $(this).find('AWB_NUMBER').text());
                    $('#txtOrigin').val($(this).find('ORIGIN').text());
                    $('#txtDestination').val($(this).find('DESTINATION').text());
                    $('#txFlightNo').val($(this).find('Booked_Flight_Airline').text() + $(this).find('Booked_Flight_Airline').text());
                    $('#txPointofLoading').val($(this).find('OFFLOAD_POINT').text());
                    $('#txtContentasperAWB').val($(this).find('DESCRIPTION').text());
                    //   $('#txtExcessPieces').val($(this).find('ExcessLanded').text());
                    //  $('#txtDamagePieces').val($(this).find('DamagePkgs').text());

                    $('#lblNPX').text($(this).find('NPX').text())
                    $('#lblWtExp').text($(this).find('WtExp').text())
                    $('#lblNPR').text($(this).find('NPR').text())
                    $('#lblWtRec').text($(this).find('WtRec').text())

                });

                $(xmlDoc).find('Table1').each(function (index) {

                    $('#lblAWBNoForShow').text($(this).find('AIRLINE_PREFIX').text() + $(this).find('AWB_NUMBER').text());
                    $('#txtOrigin').val($(this).find('ORIGIN').text());
                    $('#txtDestination').val($(this).find('DESTINATION').text());
                    $('#txFlightNo').val($(this).find('Booked_Flight_Airline').text() + $(this).find('Booked_Flight_Airline').text());
                    $('#txPointofLoading').val($(this).find('OFFLOAD_POINT').text());
                    $('#txtContentasperAWB').val($(this).find('DESCRIPTION').text());

                    $('#lblNPX').text($(this).find('NPX').text())
                    $('#lblWtExp').text($(this).find('WtExp').text())
                    $('#lblNPR').text($(this).find('NPR').text())
                    $('#lblWtRec').text($(this).find('WtRec').text())

                });
                html = '';
                $(xmlDoc).find('Table2').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html += '<div class="col-xs-6 col-form-label">';
                    html += '<label class="checkbox-inline">';
                    html += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '" >';
                    html += '</label>' + REFERENCE_DESCRIPTION + '';
                    html += '</div>';

                });
                html1 = '';
                $(xmlDoc).find('Table3').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html1 += '<div class="col-xs-6 col-form-label">';
                    html1 += '<label class="checkbox-inline">';
                    html1 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html1 += '</label>' + REFERENCE_DESCRIPTION + '';
                    html1 += '</div>';

                });

                html2 = '';
                $(xmlDoc).find('Table4').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html2 += '<div class="col-xs-6 col-form-label">';
                    html2 += '<label class="checkbox-inline">';
                    html2 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html2 += '</label>' + REFERENCE_DESCRIPTION + '';
                    html2 += '</div>';

                });


                html3 = '';
                $(xmlDoc).find('Table5').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html3 += '<div class="col-xs-6 col-form-label">';
                    html3 += '<label class="checkbox-inline">';
                    html3 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html3 += '</label>' + REFERENCE_DESCRIPTION + '';
                    html3 += '</div>';

                });

                html4 = '';
                $(xmlDoc).find('Table6').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html4 += '<div class="col-xs-6 col-form-label">';
                    html4 += '<label class="checkbox-inline">';
                    html4 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html4 += '</label>' + REFERENCE_DESCRIPTION + '';
                    html4 += '</div>';

                });

                html5 = '';
                $(xmlDoc).find('Table7').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html5 += '<div class="col-xs-6 col-form-label">';
                    html5 += '<label class="checkbox-inline">';
                    html5 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html5 += '</label>' + REFERENCE_DESCRIPTION + '';
                    html5 += '</div>';

                });

                html6 = '';
                $(xmlDoc).find('Table8').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html6 += '<div class="col-xs-6 col-form-label">';
                    html6 += '<label class="checkbox-inline">';
                    html6 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html6 += '</label>';
                    html6 += '</div>';

                });

                html7 = '';
                $(xmlDoc).find('Table8').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html7 += '<div class="col-xs-6 col-form-label">';
                    html7 += '<label class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html7 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html7 += '</label>';
                    html7 += '</div>';

                });

                html8 = '';
                $(xmlDoc).find('Table9').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html8 += '<div class="col-xs-6 col-form-label">';
                    html8 += '<label class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html8 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html8 += '</label>';
                    html8 += '</div>';

                });

                html9 = '';
                $(xmlDoc).find('Table10').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    html9 += '<div class="col-xs-6 col-form-label">';
                    html9 += '<label  class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html9 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html9 += '</label>';
                    html9 += '</div>';

                });


                html10 = '';
                $(xmlDoc).find('Table11').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    // html10 += '<div class="col-xs-6 col-form-label">';
                    html10 += '<label class="checkbox-inline">' + REFERENCE_DESCRIPTION + '';
                    html10 += '<input type="checkbox" id="' + REFERENCE_DATA_IDENTIFIER + '">';
                    html10 += '</label></br>';
                    //  html10 += '</div>';

                });

                html11 = '';
                $(xmlDoc).find('Table13').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    //html11 += '<input type="radio" id="Yes" name="ispack" value="' + REFERENCE_DATA_IDENTIFIER + '" />';
                    //html11 += '<label for="Yes">' + REFERENCE_DESCRIPTION + '</label>';
                    html11 += '<label class="radio-inline"> <input type="radio" name="typeofDis" id="' + REFERENCE_DATA_IDENTIFIER + '" value="' + REFERENCE_DATA_IDENTIFIER + '" >' + REFERENCE_DESCRIPTION + ' </label>';
                });

                html12 = '';
                $(xmlDoc).find('Table14').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    //html11 += '<input type="radio" id="Yes" name="ispack" value="' + REFERENCE_DATA_IDENTIFIER + '" />';
                    //html11 += '<label for="Yes">' + REFERENCE_DESCRIPTION + '</label>';
                    html12 += '<label class="checkbox-inline"> <input type="checkbox" name="wether" id="' + REFERENCE_DATA_IDENTIFIER + '" value="' + REFERENCE_DESCRIPTION + '">' + REFERENCE_DESCRIPTION + ' </label>';
                });

                html13 = '';
                $(xmlDoc).find('Table12').each(function (index) {

                    REFERENCE_DATA_IDENTIFIER = $(this).find('REFERENCE_DATA_IDENTIFIER').text()
                    REFERENCE_DESCRIPTION = $(this).find('REFERENCE_DESCRIPTION').text()

                    //html11 += '<input type="radio" id="Yes" name="ispack" value="' + REFERENCE_DATA_IDENTIFIER + '" />';
                    //html11 += '<label for="Yes">' + REFERENCE_DESCRIPTION + '</label>';
                    html13 += '<label class="checkbox-inline"> <input type="checkbox" name="wether" id="' + REFERENCE_DATA_IDENTIFIER + '" value="' + REFERENCE_DESCRIPTION + '">' + REFERENCE_DESCRIPTION + ' </label></br>';
                });


                $('#divChkMaterial').append(html);
                $('#divType').append(html1);
                $('#divMarkanLabel').append(html2);
                $('#divOuterPacking').append(html3);
                $('#divInnerPacking').append(html4);
                $('#divDetalofDamageObserved').append(html5);
                $('#divDetalofDamageObservedB').append(html6);
                $('#divContainers').append(html7);
                $('#divDamageDiscovered').append(html8);
                $('#divTheDamageApparentlycausedby').append(html9);
                $('#divSalvageAction').append(html10);
                $('#divTypeofdiscrepancy').append(html11);
                $('#divWeatherCondition').append(html12);
                $('#divDisposition').append(html13);
                // $('#divSalvageAction').append(html10);

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
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

function passQValue() {
    var _QuestionId;
    var _numberOfChild;
    $(_xmlDocTable).find('Table').each(function (i) {
        _QuestionId = $(this).find('QuestionId').text();
        $(_xmlDocTable).find('Table1').each(function (index) {
            //  console.log(index)
            _numberOfChild = $(this).find('ParentId').text();
            if (parseInt(_QuestionId) == parseInt(_numberOfChild)) {
                QuestionId = $(this).find('QuestionId').text();
                Checklist_Id = $(this).find('Checklist_Id').text();
                QuestionDetail = $(this).find('QuestionDetail').text();
                QuestionSection = $(this).find('QuestionSection').text();
                NAOption = $(this).find('NAOption').text();
                SequenceNo = $(this).find('SequenceNo').text();
                HasChild = $(this).find('HasChild').text();
                Question = $(this).find('Question').text();

                CheckListDetailsSubQu(QuestionId, Question, QuestionDetail, QuestionSection, SequenceNo);
                //if (parseInt(_QuestionId) == parseInt(_numberOfChild)) {
                //    for (var i = 0; i < $(_xmlDocTable).find('Table1').length; i++) {

                //        console.log([i]);
                //    }

            }

        });
    });


    $('#divCheckListDetail').append(html);
}

function CheckListDetailsSubQu(QuestionId1, Question1, QuestionDetail1, QuestionSection1, SequenceNo1) {

    html += '<ul>';
    html += '<li style="background-color: rgb(224, 243, 215);"> ' + SequenceNo1 + '. ' + Question1 + ' </li>';
    html += '<li style="background: rgb(224, 243, 215);"><label class="radio-inline"> <input type="radio" name="' + QuestionId1 + '" id="' + QuestionId1 + '" value="' + QuestionId1 + '"> </label></li>';
    html += '<li style="background: rgb(224, 243, 215);"><label class="radio-inline"> <input type="radio" name="season" id="' + QuestionId1 + '" value="' + QuestionId1 + '"> </label></li>';
    html += '<li style="background: rgb(224, 243, 215);text-align-right;"><label class="radio-inline"> <input type="radio" name="' + QuestionId1 + '" id="' + QuestionId1 + '" value="' + QuestionId1 + '"> </label></li>';
    html += '</ul>';
    //  html += '<div>' + SequenceNo1 + '. ' + Question1 + '</div>';

}

function CheckListDetailsForShow(QuestionId, Question, QuestionDetail, QuestionSection, SequenceNo, NAOption) {

    html += '<tr>';
    html += '<td style="background-color: rgb(224, 243, 215);"> ' + SequenceNo + '. ' + Question + '</br>' + ' </td>';
    html += '<td style="background: rgb(224, 243, 215);"><label class="radio-inline"> <input type="radio" name="' + QuestionId + '" id="' + QuestionId + '" value="' + QuestionId + '"> </label></td>';
    html += '<td style="background: rgb(224, 243, 215);"><label class="radio-inline"> <input type="radio" name="' + QuestionId + '" id="' + QuestionId + '" value="' + QuestionId + '"> </label></td>';
    if (NAOption == 'false') {
        html += '<td style="background: rgb(224, 243, 215);text-align-right;"><label class="radio-inline"> <input type="radio" name="' + QuestionId + '" id="' + QuestionId + '" value="' + QuestionId + '"> </label></td>';
    } else {
        html += '<td style="background: rgb(224, 243, 215);text-align-right;"><label class="radio-inline"></td>';
    }
    html += '</tr>';
}





function clearALL() {
    $('#txtAWBNo').val('');
    $('#txtAWBNo').focus();
    $('#ddlHAWB').empty();
    $('#ddlFlightNo').empty();
    $('#txtLocationShow').val('');
    $('#txtAreaRemark').val('');

}

function ClearIGM() {

    $('#ddlIGM').empty();
}

function clearBeforePopulate() {
    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
}

function ChkAndValidate() {

    var ScanCode = $('#txtAWBNo').val();
    ScanCode = ScanCode.replace(/\s+/g, '');
    ScanCode = ScanCode.replace("-", "").replace("–", "");

    if (ScanCode.length >= 11) {

        $('#txtAWBNo').val(ScanCode.substr(0, 11));
        //$('#txtAWBNo').val(ScanCode.substr(3, 8));
        //$('#txtScanCode').val('');

        //GetShipmentStatus();
    }
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

$(function () {
    //$("#txtBCDate").datepicker({
    //    dateFormat: "dd/mm/yy"
    //});
    //$("#txtBCDate").datepicker().datepicker("setDate", new Date());
});



function SaveImportDamageRecordDetails(finalXML) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    // InputXML = '<Root><AWBNo>' + $("#txtAWBNo").val() + '</AWBNo><AirportCity>' + AirportCity + '</AirportCity></Root>';
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "SaveImportDamageRecordDetails",
            data: JSON.stringify({ 'InputXML': finalXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                //var str = response.d;
                var xmlDoc = $.parseXML(response);
                //$('#divVCTDetail').html('');
                console.log(xmlDoc)
                $('#ddlHAWB').empty();


                $(xmlDoc).find('Table').each(function (index) {
                    var Status = $(this).find('Status').text();
                    var StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'E') {
                        $.alert(StrMessage);
                        $('#txtAWBNo').val('');
                        $('#txtAWBNo').focus();
                        return;
                    }
                });



            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
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


