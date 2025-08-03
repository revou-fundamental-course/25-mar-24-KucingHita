// BAGIAN 1: SETUP & GENERATE FORM
const generateBtn = document.getElementById('generate-table-btn');
const dynamicInputSection = document.getElementById('dynamic-input-section');
const criteriaContainer = document.getElementById('criteria-input-container');
const alternativesContainer = document.getElementById('alternatives-input-container');

generateBtn.addEventListener('click', () => {
    const numAlternatives = parseInt(document.getElementById('num-alternatives').value);
    const numCriteria = parseInt(document.getElementById('num-criteria').value);

    if (isNaN(numAlternatives) || isNaN(numCriteria) || numAlternatives < 2 || numCriteria < 2) {
        alert("Jumlah alternatif dan kriteria minimal harus 2.");
        return;
    }

    // --- Generate Tabel Input Kriteria ---
    let criteriaHTML = '<h4>Tabel Kriteria</h4><table style="width: 100%;">';
    criteriaHTML += `<thead><tr><th>Nama Kriteria</th><th>Bobot (1-100)</th><th>Tipe</th></tr></thead><tbody>`;
    for (let i = 0; i < numCriteria; i++) {
        criteriaHTML += `
            <tr>
                <td><input type="text" placeholder="Kriteria ${i + 1}" class="form-item criteria-name" required></td>
                <td><input type="number" placeholder="Contoh: 80" class="form-item criteria-weight" min="1" max="100" required></td>
                <td>
                    <select class="form-item criteria-type">
                        <option value="benefit">Benefit</option>
                        <option value="cost">Cost</option>
                    </select>
                </td>
            </tr>`;
    }
    criteriaHTML += `</tbody></table>`;
    criteriaContainer.innerHTML = criteriaHTML;

    // --- Generate Tabel Input Alternatif ---
    let alternativesHTML = '<h4>Tabel Alternatif</h4><table style="width: 100%;">';
    let headerRow = '<th>Nama Alternatif</th>';
    for (let i = 0; i < numCriteria; i++) {
        headerRow += `<th>Nilai Kriteria ${i + 1}</th>`;
    }
    alternativesHTML += `<thead><tr>${headerRow}</tr></thead><tbody>`;
    for (let i = 0; i < numAlternatives; i++) {
        let rowContent = `<td><input type="text" placeholder="Alternatif ${i + 1}" class="form-item alternative-name" required></td>`;
        for (let j = 0; j < numCriteria; j++) {
            rowContent += `<td><input type="number" class="form-item alternative-value" step="any" required></td>`;
        }
        alternativesHTML += `<tr>${rowContent}</tr>`;
    }
    alternativesHTML += `</tbody></table>`;
    alternativesContainer.innerHTML = alternativesHTML;

    dynamicInputSection.style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
});


// BAGIAN 2: PROSES PERHITUNGAN UTAMA (SAAT TOMBOL 'HITUNG' DIKLIK)
const spkForm = document.getElementById('spk-form');

spkForm.addEventListener('submit', (event) => {
    event.preventDefault();

    try {
        // a. Membaca semua data dari form kriteria
        const criteriaNames = Array.from(document.querySelectorAll('.criteria-name')).map(el => el.value);
        const criteriaWeights = Array.from(document.querySelectorAll('.criteria-weight')).map(el => parseFloat(el.value));
        const criteriaTypes = Array.from(document.querySelectorAll('.criteria-type')).map(el => el.value);

        // b. Membaca semua data dari form alternatif
        const alternativeNames = Array.from(document.querySelectorAll('.alternative-name')).map(el => el.value);
        const alternativeValuesRows = Array.from(document.querySelectorAll('#alternatives-input-container tbody tr'));
        
        const alternatives = alternativeValuesRows.map((row, i) => {
            const values = Array.from(row.querySelectorAll('.alternative-value')).map(el => parseFloat(el.value));
            return { name: alternativeNames[i], values: values };
        });

        // c. Normalisasi Bobot
        const totalWeight = criteriaWeights.reduce((sum, w) => sum + w, 0);
        const normalizedWeights = criteriaWeights.map(w => w / totalWeight);

        // d. Implementasi Perhitungan Weighted Product (WP)
        // Sesuaikan bobot: jika 'cost', jadikan negatif
        const wpWeights = normalizedWeights.map((w, i) => (criteriaTypes[i] === 'cost' ? -w : w));

        // Hitung Vektor S
        let sumVectorS = 0;
        const vectorS = alternatives.map(alt => {
            let s_value = 1;
            alt.values.forEach((val, j) => {
                s_value *= Math.pow(val, wpWeights[j]);
            });
            sumVectorS += s_value;
            return { name: alt.name, s_value: s_value };
        });

        // e. Menghitung Vektor V (Nilai Preferensi)
        const finalResults = vectorS.map(item => ({
            name: item.name,
            s_value: item.s_value,
            v_value: item.s_value / sumVectorS
        }));

        // f. Mengurutkan dan Menampilkan Hasil
        finalResults.sort((a, b) => b.v_value - a.v_value);
        displayResults(criteriaNames, normalizedWeights, finalResults);

    } catch (error) {
        alert("Terjadi kesalahan. Pastikan semua field telah diisi dengan benar.");
        console.error(error);
    }
});


// BAGIAN 3: MENAMPILKAN HASIL
function displayResults(criteriaNames, normalizedWeights, finalResults) {
    const resultSection = document.getElementById('result-section');
    const resultContent = document.getElementById('result-content');
    
    let html = '';

    // Tabel Normalisasi Bobot
    html += `<h4>1. Tabel Normalisasi Bobot</h4><table style="width: auto;"><thead><tr>`;
    criteriaNames.forEach(name => html += `<th>${name}</th>`);
    html += `</tr></thead><tbody><tr>`;
    normalizedWeights.forEach(w => html += `<td>${w.toFixed(3)}</td>`);
    html += `</tr></tbody></table>`;

    // Tabel Perhitungan Vektor S & V
    html += `<h4 style="margin-top: 20px;">2. Tabel Perhitungan Vektor S dan V</h4><table><thead><tr><th>Alternatif</th><th>Vektor S</th><th>Vektor V (Nilai Preferensi)</th></tr></thead><tbody>`;
    finalResults.forEach(res => {
        html += `<tr>
            <td>${res.name}</td>
            <td>${res.s_value.toFixed(5)}</td>
            <td>${res.v_value.toFixed(5)}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    
    // Tabel Hasil Akhir (Ranking)
    html += `<h4 style="margin-top: 20px;">3. Tabel Hasil Akhir (Ranking)</h4><table><thead><tr><th>Peringkat</th><th>Alternatif</th><th>Nilai Akhir</th></tr></thead><tbody>`;
    finalResults.forEach((res, index) => {
        html += `<tr>
            <td><b>${index + 1}</b></td>
            <td>${res.name}</td>
            <td><b>${res.v_value.toFixed(5)}</b></td>
        </tr>`;
    });
    html += `</tbody></table>`;

    // Kesimpulan
    if (finalResults.length > 0) {
        html += `<p style="margin-top:20px;"><b>Kesimpulan:</b> Alternatif terbaik adalah <strong>${finalResults[0].name}</strong> dengan nilai preferensi tertinggi sebesar <strong>${finalResults[0].v_value.toFixed(5)}</strong>.</p>`;
    }

    resultContent.innerHTML = html;
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}