export function openModal(idModal: string) {
    (document.getElementById(idModal) as HTMLDialogElement).showModal()
}

export function closeModal(idModal: string) {
    (document.getElementById(idModal) as HTMLDialogElement).close()
}

export function mascaraCPF(valor?: string): string {

    if (valor) {
        valor.replace(/\D/g, '');

        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        return valor;
    }

    return ''

}

export function mascaraCNPJ(valor?: string): string {

    if (valor) {
        valor.replace(/\D/g, '');

        valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
        valor = valor.replace(/(\d{4})(\d{1,2})$/, '$1-$2');

        return valor;
    }

    return ''

}

export function mascaraMoeda(valor?: string): string {

    if (valor) {

        valor = valor.replace(/\D/g, '');

        valor = (parseInt(valor) / 100).toFixed(2) + '';

        valor = valor.replace('.', ',');
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return 'R$ ' + valor;
    }

    return ''
}

export function extrairNumeros(str: string): string {
    if (str) {
        const numeros = str.match(/\d+/g);
        return numeros ? numeros.join('') : '';
    }
    return ''
}
