const provinsiSelect = document.getElementById("provinsi");
const kabupatenSelect = document.getElementById("kabupaten");
const kecamatanSelect = document.getElementById("kecamatan");
const hasilDiv = document.getElementById("hasil");

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function loadProvinsi() {
    const provinsiData = await fetchData("https://wilayah.id/api/provinces.json");
    provinsiData.forEach(prov => {
        const option = document.createElement("option");
        option.value = prov.id;
        option.text = prov.name;
        provinsiSelect.add(option);
    });
}

provinsiSelect.addEventListener("change", async function() {
    kabupatenSelect.innerHTML = '<option value="">--Pilih Kabupaten/Kota--</option>';
    kecamatanSelect.innerHTML = '<option value="">--Pilih Kecamatan--</option>';

    if (!this.value) return;

    const kabupatenData = await fetchData(`https://wilayah.id/api/regencies/${this.value}.json`);
    kabupatenData.forEach(kab => {
        const option = document.createElement("option");
        option.value = kab.id;
        option.text = kab.name;
        kabupatenSelect.add(option);
    });
});

kabupatenSelect.addEventListener("change", async function() {
    kecamatanSelect.innerHTML = '<option value="">--Pilih Kecamatan--</option>';

    if (!this.value) return;

    const kecamatanData = await fetchData(`https://wilayah.id/api/districts/${this.value}.json`);
    kecamatanData.forEach(kec => {
        const option = document.createElement("option");
        option.value = kec.id;
        option.text = kec.name;
        kecamatanSelect.add(option);
    });
});

async function cariKodePos() {
    const provinsi = provinsiSelect.value;
    const kabupaten = kabupatenSelect.value;
    const kecamatan = kecamatanSelect.value;

    if (!provinsi || !kabupaten || !kecamatan) {
        hasilDiv.innerHTML = "<p>Silakan pilih semua kategori.</p>";
        return;
    }

    const kodePosData = await fetchData(`https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${kabupaten}&d_kecamatan_id=${kecamatan}`);
    if (kodePosData.status === 200 && kodePosData.result.length > 0) {
        hasilDiv.innerHTML = `<p>Kode Pos: ${kodePosData.result[0].text}</p>`;
    } else {
        hasilDiv.innerHTML = "<p>Data tidak ditemukan.</p>";
    }
}

window.onload = loadProvinsi;
