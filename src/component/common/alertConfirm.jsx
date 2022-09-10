import Swal from 'sweetalert2'

export const alertConfirm = (parameters, thenFunction, id) => {
    Swal.fire({
        title: parameters.title ?? '',
        text: parameters.text ?? '',
        icon: parameters.icon ?? 'success',
        showCancelButton: parameters.showCancelButton ?? true,
        confirmButtonColor: parameters.confirmButtonColor ?? '#3085d6',
        cancelButtonColor: parameters.cancelButtonColor ?? '#d33',
        confirmButtonText: parameters.confirmButtonText ?? ''
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: parameters.titleConfirm ?? '',
                html: parameters.textConfirm ?? '',
                icon: parameters.iconConfirm ?? 'success',
            })
            thenFunction(id)
        }
    })
}