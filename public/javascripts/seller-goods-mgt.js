
$("#goodsSecondCategory").remoteChained({
    parents: "#goodsTopCategory",
    url: "/SellerGoodsMgt/api/publishGoodsStep1/goodsTopCategory"
});

$("#goodsThirdCategory").remoteChained({
    parents: "#goodsSecondCategory",
    url: "/SellerGoodsMgt/api/publishGoodsStep1/goodsSecondCategory"

});