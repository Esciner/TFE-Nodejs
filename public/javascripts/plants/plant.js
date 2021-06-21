window.addEventListener('DOMContentLoaded', () => {
    bindPlants();
    })
    
function bindPlants() {
    const elements = document.querySelectorAll('.btn-danger');
    const plantsContainer = document.querySelector('#plants-list-container');

    elements.forEach( e => {
    e.addEventListener('click', ($event) => {
        const plantId = $event.target.getAttribute('plantid');
        axios.delete('/plants/' + plantId)
            .then( function(response) {
            plantsContainer.innerHTML = response.data;
            bindPlants();
            })
            .catch( function(err) { console.log(err) } );
    })
    })
}