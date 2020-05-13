
function markaListele() {
    $.ajax({
        url: "/Admin/MSM/Markalar",
        method: "Get",
        success: function (data) {
            $("#icerik").find("table").remove();
            var txt = "";
            txt += "<table id='marka' class='table table-striped'>";
            txt += "<tr><th> Marka Adı </th>";
            txt += "<th> İşlemler </th></tr>";
            for (var i = 0; i < data.length; i++) {
                var id = data[i].ArabaId;
                var markaAd = data[i].Ad;
                txt += "<tr><td>" + markaAd + "</td>";
                txt += "<td><a href='#markaDuzenle' data-toggle='modal' class='btn btn-sm btn-primary' onclick=markaDuzenleBilgi(" + id + ",'" + markaAd + "')>Duzenle</a> "
                txt += "<a href='#' class='btn btn-sm btn-danger' onclick=markaSil(" + id + ")>Sil</a> </td></tr>"
            }
            txt += "</table>"
            $("#icerik").append(txt);
        }, error: function () {
            console.log("basarisiz");
        }
    });
}

function markaEkle() {
    var hatayok = true;
    if ($("#markaEkleAd").val().trim() == "") {
        $("#lblMarkaBos").show();
        hatayok = false;
    } else {     
        $.ajax(
            {
                url: "/Admin/MSM/MarkaEkle",
                method: "Post",
                data: {
                    Ad: $("#markaEkleAd").val()
                }, success: function (data) {
                    if (data == "True") {
                        $("#markaEkleAd").val("");
                        $("#lblMarkaBos").hide();
                        alert("Marka Eklendi !!!");
                    } else {
                        alert("Marka Eklemede Hata !!!");
                    }
                }, error: function (data) {
                    alert(data);
                }
            });
    }
    return hatayok;
}

function markaSil(id) {
    if (confirm("Silmeyi Onaylıyor Musunuz")) {
        $.ajax(
            {
                url: "/Admin/MSM/MarkaSil",
                method: "Post",
                data: {
                    id: id
                }, success: function (data) {
                    if (data == "True") {
                        alert("Marka Silindi !!!");
                        markaListele();
                    } else {
                        alert("Marka Silinemedi !!!");
                    }
                }, error: function (data) {
                    alert(data);
                }
            });
    } else {
        alert("İşlem İptal Edildi !!!");
    }
}

var markaId;
function markaDuzenleBilgi(id, markaAd) {
    $("#markaDuzenleAd").val(markaAd);
    $("#markaDuzenleId").val(id);
    markaId = id;
}

function markaDuzenle() {  
    var hatayok = true;
    if ($("#markaDuzenleAd").val().trim() == "") {
        $("#lblMarkaDuzenleBos").show();
        hatayok = false;
    } else {      
        $.ajax(
            {
                url: "/Admin/MSM/MarkaGuncelle",
                method: "Post",
                data: {
                    ArabaId: markaId,
                    Ad: $("#markaDuzenleAd").val()
                }, success: function (data) {
                    if (data == "True") {
                        $("#lblMarkaDuzenleBos").hide();
                        alert("Marka Güncellendi !!!");
                    } else {
                        alert("Marka Güncellemede Hata !!!");
                    }
                }, error: function (data) {
                    alert(data);
                }
            });
    }
    return hatayok;
}

// Seri Scripts
function seriListele() {
    $.ajax({
        url: "/Admin/MSM/SerilerVeMarka",
        method: "Get",
        success: function (data) {
            $("#icerik").find("table").remove();
            var txt = "";
            txt += "<table id='marka' class='table table-striped'>";
            txt += "<tr><th> Seri Adı </th>";
            txt += "<th> İşlemler </th></tr>";
            for (var i = 0; i < data.length; i++) {
                var id = data[i].ArabaId;
                var markaAd = data[i].Ad;
                var ustKategori = data[i].UstKategori;
                if (data[i].UstKategori == 0) {
                    txt += "<tr><th colspan='2' style='font-size:20px'>" + markaAd + "</th></tr>";
                } else {
                    txt += "<tr><td>" + markaAd + "</td>";
                    txt += "<td><a href='#seriDuzenle' data-toggle='modal' class='btn btn-sm btn-primary' onclick=markaGetirDuzenle(" + id + ",'" + markaAd + "'," + ustKategori + ")>Duzenle</a> "
                    txt += "<a href='#' class='btn btn-sm btn-danger' onclick=seriSil(" + id + ")>Sil</a> </td></tr>"
                }
            }
            txt += "</table>"
            $("#icerik").append(txt);

        }, error: function () {
            console.log("basarisiz");
        }
    });
}

function markaGetir() {
    $.ajax({
        url: "/Admin/MSM/Markalar",
        method: "Get",
        success: function (data) {
            $("#markaseriekle").find("option").remove();
            for (var i = 0; i < data.length; i++) {
                var id = data[i].ArabaId;
                var markaAd = data[i].Ad;
                $("#markaseriekle").append("<option value='" + id + "'>" + markaAd + "</option>");
            }
        }, error: function () {
            console.log("basarisiz");
        }
    });
}

function seriEkle() {
    var hatayok = true;
    if ($("#seriEkleAd").val().trim() == "") {
        $("#lblSeriEkleBos").show();
        hatayok = false;
    } else {
        $.ajax(
            {
                url: "/Admin/MSM/SeriEkle",
                method: "Post",
                data: {
                    Ad: $("#seriEkleAd").val(),
                    UstKategori: $("#markaseriekle").val()
                }, success: function (data) {
                    if (data == "True") {
                        $("#seriEkleAd").val("");
                        $("#lblSeriEkleBos").hide();
                        alert("Seri Eklendi !!!");
                    } else {
                        alert("Seri Eklemede Hata !!!");
                    }
                }, error: function (data) {
                    alert("Bir Hata Oluştu !!!");
                }
            });
    }
    return hatayok;
}

function seriSil(id) {
    if (confirm("Silmeyi Onaylıyor Musunuz")) {
        $.ajax(
            {
                url: "/Admin/MSM/SeriSil",
                method: "Post",
                data: {
                    id: id
                }, success: function (data) {
                    if (data == "True") {
                        alert("Seri Silindi !!!");
                        seriListele();
                    } else {
                        alert("Seri Silinemedi !!!");
                    }
                }, error: function (data) {
                    alert("Bir Hata Oluştu!!!");
                }
            });
    } else {
        alert("İşlem İptal Edildi !!!");
    }
}

var seriId;
var selectMarka;
function markaGetirDuzenle(id, markaAd, ustKategori) {
    selectMarka = markaAd;
    seriId = id;
    $.ajax({
        url: "/Admin/MSM/Markalar",
        method: "Get",
        success: function (data) {
            $("#markaseriduzenle").find("option").remove();
            for (var i = 0; i < data.length; i++) {
                var id = data[i].ArabaId;
                var markaAd = data[i].Ad;
                $("#markaseriduzenle").append("<option value='" + id + "'>" + markaAd + "</option>");
            }
            //$("#markaseriduzenle").find('option[value=""+ +""]').attr('selected', 'selected')
            $("#markaseriduzenle").val(ustKategori);
            $("#seriDuzenleAd").val(selectMarka);
        }, error: function () {
            console.log("basarisiz");
        }
    });
}

function seriDuzenle() {
    var hatayok = true;
    if ($("#seriDuzenleAd").val().trim() == "") {
        $("#lblSeriDuzenleBos").show();
        hatayok = false;
    } else {
        $.ajax(
            {
                url: "/Admin/MSM/SeriGuncelle",
                method: "Post",
                data: {
                    ArabaId: seriId,
                    Ad: $("#seriDuzenleAd").val(),
                    UstKategori: $("#markaseriduzenle").val()
                }, success: function (data) {
                    if (data == "True") {
                        $("#lblSeriDuzenleBos").hide();
                        alert("Seri Güncellendi !!!");
                    } else {
                        alert("Seri Güncellemede Hata !!!");
                    }
                }, error: function (data) {
                    alert(data);
                }
            });
    }
    return hatayok;
}

