
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

function modelListele() {
    var temp;
    $.ajax({
        url: "/Admin/MSM/MarkaSeriModel",
        method: "Get",
        success: function (data) {
            $("#icerik").find("table").remove();
            var txt = "";
            txt += "<table id='marka' class='table table-striped'>";
            txt += "<tr><th> Model Adı </th>";
            txt += "<th> İşlemler </th></tr>";
            for (var i = 0; i < data.length; i++) {
                var id = data[i].ArabaId;
                var markaAd = data[i].Ad;
                var ustKategori = data[i].UstKategori;
                if (ustKategori == 0) {
                    temp = id;
                    txt += "<tr><th colspan='2' style='font-size:20px'>" + markaAd + "</th></tr>";
                } else if (temp == ustKategori) {
                    txt += "<tr><th colspan='2' style='font-size:20px'>-----" + markaAd + "</th></tr>";
                } else {
                    txt += "<tr><td>" + markaAd + "</td>";
                    txt += "<td><a href='#modelDuzenle' data-toggle='modal' class='btn btn-sm btn-primary' onclick=modelGetirDuzenle(" + id + ",'" + markaAd + "'," + ustKategori + ")>Duzenle</a> "
                    txt += "<a href='#' class='btn btn-sm btn-danger' onclick=modelSil(" + id + ")>Sil</a> </td></tr>"
                }
            }
            txt += "</table>"
            $("#icerik").append(txt);

        }, error: function () {
            console.log("basarisiz");
        }
    });
}

function markaGetirModel() {
    $.ajax({
        url: "/Admin/MSM/Markalar",
        method: "Get",
        success: function (data) {
            $("#markamodelekle").find("option").remove();
            for (var i = 0; i < data.length; i++) {
                var id = data[i].ArabaId;
                var markaAd = data[i].Ad;
                $("#markamodelekle").append("<option value='" + id + "'>" + markaAd + "</option>");
            }
        }, error: function () {
            console.log("basarisiz");
        }
    });
}

function seriFiltrele() {
    $.ajax({
        url: "/Admin/MSM/SeriFiltrele",
        method: "Post",
        data: {
            id: $("#markamodelekle").val()
        },
        success: function (data) {
            $("#serimodelekle").find("option").remove();
            for (var i = 0; i < data.length; i++) {
                $("#serimodelekle").append("<option value='" + data[i].ArabaId + "'>" + data[i].Ad + "</option>");
            }
        },
        error: function () {
            console.log("basarisiz");
        }
    });
}


function seriFiltreleDuzenle() {
    $.ajax({
        url: "/Admin/MSM/SeriFiltrele",
        method: "Post",
        data: {
            id: $("#markamodelduzenle").val()
        },
        success: function (data) {
            $("#serimodelduzenle").find("option").remove();
            for (var i = 0; i < data.length; i++) {
                $("#serimodelduzenle").append("<option value='" + data[i].ArabaId + "'>" + data[i].Ad + "</option>");
            }
        },
        error: function () {
            console.log("basarisiz");
        }
    });
}

function modelEkle() {
    var hatayok = true;
    if ($("#modelEkleAd").val().trim() == "") {
        $("#lblModelEkleBos").show();
        $("#lblModelEkleSeriBos").hide();
        hatayok = false;
    } else if ($("#serimodelekle").val() == null) {
        $("#lblModelEkleSeriBos").show();
        $("#lblModelEkleBos").hide();
        hatayok = false;
    } else {
        $.ajax(
            {
                url: "/Admin/MSM/SeriEkle",
                method: "Post",
                data: {
                    Ad: $("#modelEkleAd").val(),
                    UstKategori: $("#serimodelekle").val()
                }, success: function (data) {
                    if (data == "True") {
                        $("#modelEkleAd").val("");
                        $("#lblModelEkleBos").hide();
                        $("#lblModelEkleSeriBos").hide();
                        alert("Model Eklendi !!!");
                    } else {
                        alert("Model Eklemede Hata !!!");
                    }
                }, error: function (data) {
                    alert("Bir Hata Oluştu !!!");
                }
            });
    }
    return hatayok;
}

function modelSil(id) {
    if (confirm("Modeli Silmeyi Onaylıyor Musunuz")) {
        $.ajax(
            {
                url: "/Admin/MSM/SeriSil",
                method: "Post",
                data: {
                    id: id
                }, success: function (data) {
                    if (data == "True") {
                        alert("Model Silindi !!!");
                        modelListele();
                    } else {
                        alert("Model Silinemedi !!!");
                    }
                }, error: function (data) {
                    alert("Bir Hata Oluştu!!!");
                }
            });
    } else {
        alert("İşlem İptal Edildi !!!");
    }
}

var modelId;
var selectedModel;
var select;
function modelGetirDuzenle(id, modelAd, ustKategori) {
    selectedModel = modelAd;
    modelId = id;
    $.ajax({
        url: "/Admin/MSM/Seriler",
        method: "Get",
        success: function (data) {
            $("#serimodelduzenle").find("option").remove();
            for (var i = 0; i < data.length; i++) {
                var id = data[i].ArabaId;
                var markaAd = data[i].Ad;
                $("#serimodelduzenle").append("<option value='" + id + "' name='" + data[i].UstKategori + "' id='" + id + "'>" + markaAd + "</option>");
            }
            $("#serimodelduzenle").val(ustKategori);
            $("#modelDuzenleAd").val(selectedModel);
            select = $("#serimodelduzenle").find("option:selected").attr("name");
            markaGetirModelDuzenle();

        }, error: function () {
            console.log("basarisiz");
        }
    });

}

function markaGetirModelDuzenle() {
    $.ajax({
        url: "/Admin/MSM/Markalar",
        method: "Get",
        success: function (data) {
            $("#markamodelduzenle").find("option").remove();
            for (var i = 0; i < data.length; i++) {
                var id = data[i].ArabaId;
                var markaAd = data[i].Ad;
                $("#markamodelduzenle").append("<option value='" + id + "'>" + markaAd + "</option>");
            }
            $("#markamodelduzenle").val(select);
        }, error: function () {
            console.log("basarisiz");
        }
    });
}

function modelDuzenle() {
    var hatayok = true;
    if ($("#modelDuzenleAd").val().trim() == "") {
        $("#lblModelDuzenleBos").show();
        $("#lblModelDuzenleSeriBos").hide();
        hatayok = false;
    } else if ($("#serimodelduzenle").val() == null) {
        $("#lblModelDuzenleSeriBos").show();
        $("#lblModelDuzenleBos").hide();
        hatayok = false;
    } else {
        $.ajax(
            {
                url: "/Admin/MSM/SeriGuncelle",
                method: "Post",
                data: {
                    ArabaId: modelId,
                    Ad: $("#modelDuzenleAd").val(),
                    UstKategori: $("#serimodelduzenle").val()
                }, success: function (data) {
                    if (data == "True") {
                        modelDuzenle();
                        $("#lblModelDuzenleBos").hide();
                        $("#lblModelDuzenleSeriBos").hide();
                        alert("Model Güncellendi !!!");
                    } else {
                        alert("Model Güncellemede Hata !!!");
                    }
                }, error: function (data) {
                    alert(data);
                }
            });
    }
    return hatayok;
}