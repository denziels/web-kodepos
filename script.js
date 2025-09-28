let provinsiData = [];
let kotaData = [];
let kecamatanData = [];
let kodeposData = [];

async function loadData() {
    provinsiData = await fetch('data/provinsi.json').then(res => res.json());
    kotaData = await fetch('data/kota.json').then(res => res.json());
    kecamatanData = await fetch('data/kecamatan.json').then(res => res.json());
    kodeposData = await fetch('data/kodepos.json').then(res => res.json());
    
    populateProvinsi();
}

function populateProvinsi() {
    const provinsiSelect = document.getElementById('provinsi');
    provinsiSelect.innerHTML = '<option value="">--Pilih Provinsi--</option>';
    provinsiData.forEach(p => {
        provinsiSelect.innerHTML += `<option value="${p.id}">${p.nama}</option>`;
    });
}

document.getElementById('provinsi').addEventListener('change', function() {
    const provId = parseInt(this.value);
    const kotaSelect = document.getElementById('kota');
    kotaSelect.innerHTML = '<option value="">--Pilih Kota--</option>';
    kotaData.filter(k => k.provinsi_id === provId).forEach(k => {
        kotaSelect.innerHTML += `<option value="${k.id}">${k.nama}</option>`;
    });
    document.getElementById('kecamatan').innerHTML = '<option value="">--Pilih Kecamatan--</option>';
    document.getElementById('kodepos').value = '';
});

document.getElementById('kota').addEventListener('change', function() {
    const kotaId = parseInt(this.value);
    const kecSelect = document.getElementById('kecamatan');
    kecSelect.innerHTML = '<option value="">--Pilih Kecamatan--</option>';
    kecamatanData.filter(kec => kec.kota_id === kotaId).forEach(kec => {
        kecSelect.innerHTML += `<option value="${kec.id}">${kec.nama}</option>`;
    });
    document.getElementById('kodepos').value = '';
});

document.getElementById('kecamatan').addEventListener('change', function() {
    const kecId = parseInt(this.value);
    const kodepos = kodeposData.find(k => k.kecamatan_id === kecId);
    document.getElementById('kodepos').value = kodepos ? kodepos.kodepos : '';
});

loadData();
