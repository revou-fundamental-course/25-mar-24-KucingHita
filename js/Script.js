document.getElementById("bmiform").addEventListener("submit" ),function(event){
  //event.preventDefault();

  var sex = document.querySelector('input[name="sex"]:checked');
  var berat = parseFloat(document.getElementById("weight-input").value);
  var tahun = parseFloat(document.getElementById("age-input").value);
  var tinggi = parseFloat(document.getElementById("height-input").value);

  // Rumus BMI
  var bmi = berat / (tinggi * tinggi)

  // Deteksi input gender
if (!sex) {
    alert('jenis kelamin wajib diisi');
    return;
}

  // Rentang skor Dalam kategori BMI
  var kategori;
  if (bmi < 18,5){
     kategori = "Kurus";
  }else if (bmi >= 18.5 && bmi < 24.9){
     kategori = "Normal";
  }else if (bmi >= 25 && bmi < 29.9){
     kategori = "Gemuk";
  }else {
     kategori = "Obesitas";
  }

  // Memberikan keterangan
  var keterangan;
  switch (kategori){
      case "Kurus":
          keterangan = "berat Badan Anda Rendah.";
          break;
      case "Normal":
          keterangan = "Berat Badan Anda Ideal.";
          break;
      case "Gemuk":
          keterangan = "Anda Termasuk Memiliki Berat Berlebih.";
          break;
      case "Obesitas":
          keterangan = "Anda tergolong Obesitas.Segera Konsultasikan dengan dokter untuk mendapatkan saran kesehatan.";
  }
  
//Berisi pesan mengenai apa yang harus dilakukan jika tergolong dalam rentang tersebut
var info;
switch(kategori){
    case "Kurus":
        info = "hasil BMI kurang dari 18.5.\n\n utamakan hidup sehat dan perhatikan konsumsi harian.Konsultasikan dengan dokter mengenai berat badan kalian";
        break;
    case "Normal":
        info = "Hasil BMI diantara 18.5 dan 24.9.\n\n BMI anda tergolong sehat,pastikan asupan kalori sesuai dengan kebutuhan kalori harian dan konsumsi makanan sehat";
        break;
    case "Gemuk" :
        info = "Hasil BMI diantara 25 dan 29.9.\n\n sebaiknya perhatikan pola makan dan berolahraga teratur untuk mencapai berat badan ideal.Utamakan hidup sehat";
        break;
    case "Obesitas":
        info = "Hasil BMI lebih dari 30.\n\n Anda tergolong Obesitas. Segera konsultasikan dengan dokter untuk mendapatkan saran kesehatan yang tepat";
        break;
}
// Update element
document.getElementById("bmiValue").innerText = bmi.toFixed(2);
document.getElementById("bmiCategory").innerText = kategori;
document.getElementById("keterangan").innerText = keterangan;
document.getElementById("informasi").innerText = informasi;


}
