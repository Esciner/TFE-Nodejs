window.addEventListener('DOMContentLoaded', () => {
    bindDatasets();
    })
    
function bindDatasets() {
    const elements = document.querySelectorAll('.btn-danger');
    const datasetsContainer = document.querySelector('#datasets-list-container');

    elements.forEach( e => {
        e.addEventListener('click', ($event) => {
            const datasetId = $event.target.getAttribute('datasetid');
            axios.delete('/datasets/' + datasetId)
                .then( function(response) {
                    datasetsContainer.innerHTML = response.data;
                    bindDatasets();
                })
                .catch( function(err) { console.log(err) } );
                $event.stopPropagation();
                $event.preventDefault();
        });
    })
}