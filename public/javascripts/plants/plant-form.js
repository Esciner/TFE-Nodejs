window.addEventListener('DOMContentLoaded', () => {
    const inputPlantImage = document.querySelector('#input-plant-image');
    const formContainer = document.querySelector('#form-container');
    const plantImage = document.querySelector('#plant-image');

    plantImage.addEventListener('click', () => {
        inputPlantImage.click();
    });

    inputPlantImage.addEventListener('change', function () {
        readURL(this);
    });

});

function readURL(input) {
    const url = input.value;
    const ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    const plantImage = document.querySelector('#plant-image');
    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();

        reader.onload = function (e) {
            plantImage.src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
};