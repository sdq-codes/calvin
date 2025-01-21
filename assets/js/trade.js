$('input').on('input', function () {
    // Replace any non-numeric characters except for '.' with an empty string
    this.value = this.value.replace(/[^0-9.]/g, '');

    // Allow only one '.' in the input
    if ((this.value.match(/\./g) || []).length > 1) {
        this.value = this.value.slice(0, -1);
    }
});

function getPriceBar() {
    var symbol = a + '-USDT';
    $.getJSON('https://data-api.cryptocompare.com/index/cc/v1/latest/tick?market=cadli&instruments=' + symbol + '&apply_mapping=true&api_key=f48c0e4818b68734246c7f8c3dab2e1dc2304b0c6280d378ddad2e7e33339abf', function (data) {
        $('.Cprice').text(formatToCurrency(data['Data'][symbol]['VALUE'], 6));
        $('#txtPrice').val(formatToCurrency(data['Data'][symbol]['VALUE'], 6));
        let changeValue = String(formatToCurrency(data['Data'][symbol]['MOVING_24_HOUR_CHANGE_PERCENTAGE'],2));
        if (!changeValue.includes('-')) {
            changeValue = '+' + changeValue;
            $('.Cchange').addClass('VrhAny').removeClass('rcmxVw');
        }
        else {
            $('.Cchange').addClass('rcmxVw').removeClass('VrhAny');
        }
        $('.Cchange').text(changeValue + '%');

        $('.Chigh').text(formatToCurrency(data['Data'][symbol]['MOVING_24_HOUR_HIGH'], 6));
        $('.Clow').text(formatToCurrency(data['Data'][symbol]['MOVING_24_HOUR_LOW'], 6));
        $('.Cvolume').text(formatToCurrency(data['Data'][symbol]['MOVING_24_HOUR_VOLUME'], 6)+' USDT');
        if (data['Data'][symbol]['VALUE_FLAG'] == 'UP') {
            $('.Cprice').addClass('VrhAny').removeClass('rcmxVw');
            
        }
        else {
            $('.Cprice').addClass('rcmxVw').removeClass('VrhAny');
            
        }
    });
}
var a = 'BTC';
$(window).on('load', function () {
    a = $('#hiddenCoin').val();
    setInterval(getPriceBar, 3000);
    loadInfo(a);
    loadChat($('#hiddenTV').val());
    setInterval(loadBal, 5000);
});

function loadBal() {
    var tradeType = $("#tradeType").val();
    if (bal) {
        if (tradeType.toLowerCase() == "spot") {
            $('.balance b').text($("#action").val() == "Buy" ? formatToCurrency(bal['USDT']['SpotAvailableBalance'], 6) : formatToCurrency(bal[$(".Ccoin").first().text()]['SpotAvailableBalance'], 6));
        }
        else if (tradeType.toLowerCase() == "margin") {
            $('.balance b').text($("#action").val() == "Buy" ? formatToCurrency(bal['USDT']['MarginAvailableBalance'], 6) : formatToCurrency(bal[$(".Ccoin").first().text()]['MarginAvailableBalance'], 6));
        }
        else if (tradeType.toLowerCase() == "future") {
            $('.balance').text((formatToCurrency(bal['USDT']['FuturesAvailableBalance'], 6)) + " USDT");
        }
    }
}

$(".list .option").on("click", function () {
    var name = $(this).find(".symbol-name span").text().trim();
    var tv = $(this).find("#txtTv").val().trim();
    var leverage = $(this).find(".pair-wrapper .margin-ratio").text().trim();
    $('.margin-ratio .ratio').text(leverage);
    $(".symbol-item").removeClass("active");
    $(this).find(".symbol-item").addClass("active");
    $(".market-wrapper").removeClass("show");
    loadInfo(name);
    getPriceBar();
    loadChat(tv);
    switchMeter(tv);
    a = name;
})

function loadInfo(name) {
    $("#currency").val(name);
    $('.Cimg').attr("src", "../../cryptoIcons/" + name + ".png");
    $('.Ccoin').text(name);
    $('#txtAmt').attr("placeholder", "≥ 0.00001 " + name);
    $('#sizeTxt').attr("placeholder", "Min Qty is 0.00001 " + name);
}

function loadChat(s) {
    $('#tvArea').empty();
    var t1 = '<div class="tradingview-widget-container">';
    var t2 = '<div id="tradingview_53d80"></div>';
    var t3 = '<script src="https://s3.tradingview.com/tv.js"></script>';
    var t4 = "<script> new TradingView.widget( { \"width\": \"100%\", \"height\": 450,  \"symbol\": \"" + s + "\",  \"interval\": \"3\",  \"timezone\": \"Etc/UTC\",  \"theme\": \"Dark\",  \"style\": \"1\",  \"locale\": \"en\", \"enable_publishing\": false, \"hide_side_toolbar\": true, \"save_image\": false, \"container_id\": \"tradingview_53d80\"    }   );  </script>";
    $('#tvArea').append(t1, t2, t3, t4);
}

function placeTrade(t, b) {
    event.preventDefault();
    if (bal) {
        var v = $('#txtAmt').val();
        v = unformatCurrency(v);
        if (isNaN(v)) {
            return;
        }
        $("#" + b).html('<span class="mdi mdi-24px mdi-react mdi-spin"></span>');
        $("#" + b).prop("disabled", true);
        var o = $('.Cprice').text();
        o = o.replace(/[$,\sA-Za-z]/g, '');
        
        var s1 = $('.Ccoin').first().text();
        var s2 = "USDT";
        var copyFor = $("#txtCopyFor").val() == undefined ? "0" : $("#txtCopyFor").val();
        var tp = 0;
        var sl = 0;
        var lev = 0;
        if ($(".margin-ratio").is(":visible")) {
            var lev = $(".margin-ratio .ratio").text();
        }
        var tt = $("#tradeType").val();

        $.getJSON("../../APIs/place-trade.aspx?t=" + t + "&s1=" + s1 + "&s2=" + s2 + "&o=" + o + "&v=" + v + "&for=" + copyFor + "&tp=" + tp + "&sl=" + sl+"&lev="+lev+"&tt="+tt, function (data) {
            console.log(data.code);
            if (data.code == "1") {
                showSuccessAlert();
                $('#txtAmt').val("0.00");
                $.getJSON("sendtrademail.aspx?t=" + t + "&s=" + s + "&o=" + o + "&v=" + v + "&tp=" + tp + "&sl=" + sl, function (data) {

                });
                //loadBal();
                $("#" + b).html(t);
                $("#" + b).prop("disabled", false);
            }
            else if (data.code == "0") {
                showDangerAlert();
                $("#" + b).html(t);
                $("#" + b).prop("disabled", false);
            }
            else if (data.code == "3") {
                showDangerAlert();
                $("#" + b).html(t);
                $("#" + b).prop("disabled", false);
            }
            else if (data.code == "17") {
                window.location.href = "../../../verify.aspx?lowlevel=1";
            }
            else {
                window.location.reload();
            }
        });
    }
    else {
        window.location = "login.aspx?tourl=spot.aspx";
    }
}

function switchMeter(s) {
    $('.meter-widget').empty();

    // Create container div
    var container = $('<div>', { class: 'tradingview-widget-container' });

    // Create sub-container div
    var widget = $('<div>', { class: 'tradingview-widget-container__widget' });

    // Append widget container
    container.append(widget);

    // Append container to .meter-widget
    $('.meter-widget').append(container);

    // Create and append script dynamically
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;

    // Append the script with configuration as a direct JSON string
    container.append(script);

    // Set the script text as a proper JSON string
    var settings = {
        interval: "1m",
        width: "100%",
        isTransparent: true,
        height: "100%",
        symbol: s,
        showIntervalTabs: true,
        displayMode: "single",
        locale: "en",
        colorTheme: "dark"
    };
    script.textContent = JSON.stringify(settings);
}



function showDangerAlert() {
    $('#danger1').removeClass("hidee");
    $('#danger1').addClass("show");
    $('#danger1').addClass("showAlert");
    setTimeout(function () {
        hideDangerAlert();
    }, 5000);
}

function showSuccessAlert() {
    $('.myalert-success').removeClass("hidee");
    $('.myalert-success').addClass("show");
    $('.myalert-success').addClass("showAlert");
    setTimeout(function () {
        hideSuccessAlert();
    }, 2500);
}
$('.myclose').click(function () {
    event.preventDefault();
    hideSuccessAlert();
    hideDangerAlert();
});
function hideSuccessAlert() {

    $('.myalert-success').addClass("hidee");
    $('.myalert-success').removeClass("show");
    //location.reload();
}
function hideDangerAlert() {
    $('#danger1').addClass("hidee");
    $('#danger1').removeClass("show");

}

function loadPendingTrade() {
    $.getJSON("APIs/getmytrade.aspx?s=Pending", function (data) {
        $(".open-trade").empty();
        if (data != 0) {
            $('.r-table-empty').addClass('d-none');
            for (var result of data) {
                var a = '<tr class="r-table-row">';
                var b = '<td><div class="cell"> ' + result.Symbol + ' </div></td>';
                var c = '<td><div class="cell">' + result.Time + '</div></td>';
                var d = '<td><div class="cell"> ' + result.Type + ' </div></td>';
                var e = '<td><div class="cell"> ' + result.TradeType + ' </div></td>';
                var f = '<td><div class="cell"> ' + result.Volume + ' </div></td>';
                var g = '<td><div class="cell"> ' + result.Status + ' </div></td>';
                var h = '';
                if (result.Status == "Running") {
                    h = '<td><div class="cell"> <button data-v-1ea1df87="" class="header-right-btn-inner r-button2 r-button2-primary r-button2-medium r-button2-enabled" onClick="closeTrade(' + result.ID + ',event,this)"><span>Close</span></button> </div></td></tr>';
                }
                else {
                    h = '<td><div class="cell">  </div></td></tr>';
                }
               var da = a + b + c + d + e + f + g + h;

                $(".open-trade").append(da);
            }
        }
        else {
            var fi = '<span class="no-data"><i class="icon ion-md-document"></i>No data</span>';
            $("#open-trade").append(fi);
        }
    });
}

function loadclosedTrade() {
    var url = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    $.getJSON("APIs/getmytrade.aspx?s=Completed", function (data) {
        $("#closed-trade").empty();
        if (data != 0) {
            for (var i in data) {
                var a = '<tr class="r-table-row">';
                var b = '<td><div class="cell"> ' + data[i].Symbol + ' </div></td>';
                var c = '<td><div class="cell">' + data[i].Time + '</div></td>';
                var d = '<td><div class="cell"> ' + data[i].Type + ' </div></td>';
                var e = '<td><div class="cell"> ' + data[i].TradeType + ' </div></td>';
                var f = '<td><div class="cell"> ' + data[i].Volume + ' </div></td>';
                var g = '<td><div class="cell"> ' + data[i].Status + ' </div></td>';
                var h = '<td><div class="cell"> ' + data[i].ExpireTime + ' </div></td>';
                var i = '<td><div class="cell"> ' + data[i].Profit + ' </div></td>';
                var j = '<td><div class="cell"> ' + data[i].Loss + ' </div></td></tr>';
                var da = a + b + c + d + e + f + g + h + i + j;

                $("#closed-trade").append(da);
            }
        }
        else {
            var fi = '<span class="no-data"><i class="icon ion-md-document"></i>No data</span>';
            $("#closed-trade").append(fi);
        }
    });
}

function closeTrade(id, event, buttonElement) {
    event.preventDefault();
    $(buttonElement).find("span").addClass("mdi mdi-24px mdi-react mdi-spin").text("");
    $.getJSON("APIs/closeTrade.aspx?id=" + id, function (data) {
        if (data == 1) {
            loadPendingTrade();
            //loadclosedTrade();
        }
        else {
        }
    });
}

loadPendingTrade();
//loadclosedTrade();