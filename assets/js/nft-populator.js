if ($('#topCollections').length) {
    $(window).on('load', function () {
        $.getJSON("APIs/GetAllCollections.ashx?ps=" + 10 + "&ci=" + 0, function (data) {

            if (data != 0) {
                for (var item of data) {
                    //var item = data[i];
                    var a = '<a data-v-69620d87="" href="collection.aspx?c=' + item.collectionID + '" class="nft-hotcollect-item">';
                    var b = '<div data-v-69620d87="" class="nft-hotcollect-imgs nft-hotcollect-imgs-3">';
                    var c = '<div data-v-69620d87="" class="el-image nft-home-imgs"><img src="imgs/item.jpg" alt="" class="el-image__inner" id="IImg' + item.item1 + '"></div>';
                    var c1 = '<div data-v-69620d87="" class="el-image nft-home-imgs"><img src="imgs/item.jpg" alt="" class="el-image__inner" id="IImg' + item.item2 + '"></div>';
                    var c2 = '<div data-v-69620d87="" class="el-image nft-home-imgs"><img src="imgs/item.jpg" alt="" class="el-image__inner" id="IImg' + item.item3 + '"></div>';
                    if (item.items < 3) {
                        c2 = '';
                    }
                    if (item.items < 2) {
                        c1 = '';
                    }
                    if (item.items < 1) {
                        c = '';
                    }
                    var d = '</div>';
                    var e = '<div data-v-69620d87="" class="nft-hotcollect-name">' + item.collectionName + '</div>';
                    var f = '<div data-v-69620d87="" class="nft-hotcollect-creator">' + item.authorName + '</div>';
                    var g = '<div data-v-69620d87="" class="nft-hotcollect-desc">' + item.about + '</div></a>';
                    
                    var collection = a + b + c + c1 + c2 + d + e + f + g;
                    $('#topCollections').append(collection);
                    if (item.items > 0) {
                        GetImage(item.item1, 'Item', 'Items', 'ID', 'IImg' + item.item1);
                    }
                    if (item.items > 1) {
                        GetImage(item.item2, 'Item', 'Items', 'ID', 'IImg' + item.item2);
                    }
                    if (item.items > 2) {
                        GetImage(item.item3, 'Item', 'Items', 'ID', 'IImg' + item.item3);
                    }
                }
            }
        });
    });
}

function GetImage(pv, cn, tn, cl, id) {
    $.getJSON("APIs/GetImg.ashx?pv=" + pv + "&cn=" + cn + "&tn=" + tn + "&cl=" + cl, function (data) {
        if (data != "0") {
            $('#' + id).attr('src', data);
        }

    });
}

var ps = 10;
var ci = 0;
if ($('#latestItems').length) {
    $(window).on('load', function () {
        loadLatestItems();
    });
}


function seeScroll() {
    if ($(window).scrollTop() >= $('#latestItems').offset().top + $('#latestItems').outerHeight() - window.innerHeight) {
        loadLatestItems();
        document.removeEventListener("scroll", seeScroll);
    }
}
const AllNetworks = {};

function loadLatestItems(s) {
    s = s || "0";
    $.getJSON("APIs/GetLatestItems.ashx?ps=" + ps + "&ci=" + ci+"&s="+s, function (data) {

        if (data != 0) {
            for (var result of data) {
                //var result = data[i];
                //console.log(i)
                var html = [];
                
                html.push('<div data-v-5420df20="" data-v-235883f4="" id="item-'+result.ID+'" class="nft-card ' + result.Category + '" data-v-bea73b2c="">');
                html.push('<div data-v-5420df20="" class="nft-card-wrapper" onClick="location.href=\'item-details.aspx?t=' + result.ID + '\'">');

                html.push('<div data-v-5420df20="" class="item-img">');
                //html.push('<span data-v-5420df20="" class="item-multi-number" style="display: none;">'+i+'</span>');
                html.push('<span data-v-5420df20="" class="goods-preview-box lazy-img-bg lazy-img-bg-loaded">');
                html.push('<img data-v-5420df20="" src="imgs/item.jpg" id="TImg' + result.ID + '" alt="" loading="lazy" class="item-img-nft">');
                html.push('</span></div>');
                html.push('<div data-v-5420df20="" class="item-con">');
                html.push('<div data-v-5420df20="" class="bias"></div>');
                html.push('<div data-v-5420df20="" class="con-con">');
                html.push('<h2 data-v-5420df20="" class="tit">' + result.Name + '</h2>');
                html.push('<div data-v-5420df20=""><a data-v-5420df20="" href="#" class="seller">');
                html.push('<img data-v-5420df20="" src="imgs/avatar.svg" id="AImg' + result.OwnerID + result.ID + '" alt="">');
                html.push(result.OwnerName + '</a></div>');
                html.push('<div data-v-5420df20="" class="price-info">');
                html.push('<div data-v-5420df20="" class="usd-price">≈ $ 0.00</div>');
                html.push('<div data-v-5420df20="" class="coin-price"><label data-v-5420df20="">Price</label>');
                html.push('<div data-v-5420df20="" class="price__wrapper">');
                html.push('<img data-v-5420df20="" src="cryptoIcons/' + result.Network + '.png">');
                html.push('<span class="price">' + result.CurrentPrice + '</span><span class="network">' + result.Network + '</span>');
                html.push('</span></div></div></div></div>');
                html.push('<div data-v-5420df20="" class="btn-wrap">');
                html.push('<a data-v-235883f4="" href="item-details.aspx?t=' + result.ID + '" class="el-button buy-btn el-button--primary" data-v-5420df20=""><!----><!----><span> Buy Now </span></a>');
                html.push('</div></div></div></div>');
                AllNetworks[result.ID] = { "Network": result.Network, "ID": "item-" + result.ID };
                $('#latestItems').append(html.join(''));
                GetImage(result.ID, 'Item', 'Items', 'ID', 'TImg' + result.ID);
                GetImage(result.OwnerID, 'ProfilePic', 'Users', 'UserID', 'AImg' + result.OwnerID + result.ID);
            }
            ci = ci + ps;
            document.addEventListener("scroll", seeScroll);
            getAllLastprice2();
        }
    });
}

const AllLastprice2 = {};

function getAllLastprice2() {
    const headers = {
        'Accept': '*/*'
    };

    fetch('https://cex.io/api/tickers/USD', {
        method: 'GET',
        headers: headers
    })
    .then(res => res.json())
    .then(body => {

        // Loop through AllNetworks using Object.keys
        Object.keys(AllNetworks).forEach(coinKey => {
            // Look for matching pair in the API response
            body.data.forEach(item => {
                let pair = item.pair.split(':')[0]; // Get the pair name
                if (AllNetworks[coinKey].Network === pair) {
                    AllLastprice2[AllNetworks[coinKey].Network] = item.last; // Update last price
                }
            });
        });
        ConToUsd2();
    })
    .catch(error => {
        console.error('Error fetching last prices:', error);
    });
}

function ConToUsd2() {
    const length = Object.keys(AllNetworks).length;
    Object.keys(AllNetworks).forEach(coinKey => {
        
        var a = $("#" + AllNetworks[coinKey].ID + " .price").text();
        var r1 = AllLastprice2[AllNetworks[coinKey].Network];
        $("#" + AllNetworks[coinKey].ID + " .usd-price").text(formatToCurrency(a * r1));
       
    });

}
