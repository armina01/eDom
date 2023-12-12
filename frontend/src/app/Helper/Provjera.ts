import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

export function jePrazno(value: any): boolean {
    if((typeof value === 'string' && value.trim() === ''))
        return false
    else if(typeof value==='number' && value===0)
        return false
    return true;
}

