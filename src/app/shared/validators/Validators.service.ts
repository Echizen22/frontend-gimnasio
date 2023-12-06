import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }


  public dniValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dni: string = control.value;

      if (dni && /^[0-9]{8}[A-Z]$/.test(dni)) {
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

        const numeroDNI = parseInt(dni.substring(0, 8), 10);
        const letraCalculada = letras[numeroDNI % 23];

        if (letraCalculada === dni.charAt(8)) {
          return null; // DNI es válido
        } else {
          return { 'dniNoValido': true }; // La letra no coincide
        }
      } else {
        return { 'dniInvalido': true }; // El formato del DNI es incorrecto
      }


    }
  }
}

