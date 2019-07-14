import Swal from 'sweetalert2';

export function alertError(error) {
    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error
    })
}