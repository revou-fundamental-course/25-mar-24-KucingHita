function calculate(){
        var Berat_Badan = document.getElementsByClassName("Berat-Badan")
        var Usia = document.getElementsByClassName("Usia")
        var Tinggi_Badan = document.getElementsByClassName("Tinggi-Badan")
        var bmi_value =BeratBadan/TinggiBadan*TinggiBadan
        console.log();

        if(parseInt(bmi_value) > 0 && parseInt(bmi_value) < 18.5) {
        <label>Anda kekurangan Berat badan</label>
        } 
        
       
        else {
        document.getElementById('result-bmi').innerHTML = bmi_value;
        console.log('Berat badan anda normal');
        }

        function changeValue() {
            // Get the input element
            let inputElement = document.getElementById("myInput");
          
            // Change the value
            inputElement.value = "New Value";
          }
    
    
 }