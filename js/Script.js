document.getElementById("bmiform").addEventListener("submit" ),function(event){
  event.preventDefault();

  var sex = document.querySelector('input[name"sex"]:checked');
  var berat = parseFloat(document.getElementById("weight-input").value);
  var tahun = parseFloat(document.getElementById("age-input").value);
  var tinggi = parseFloat(document.getElementById("height-input").value);

  // Rumus BMI
  var bmi = berat / (tinggi * tinggi)

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
          keterangan = "Anda tergolong Obesitas.Segera Konsultasikan dengan dokter untuk mendapatkan saran kesehatan."
  }
  
}
