import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/country.service';
import { Country } from 'src/app/models/country';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register_form: FormGroup;
  countries: Country[] = [];

  constructor(private userService: UserService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((docs: Country[]) => {
      this.countries = docs;
    });

    this.register_form = new FormGroup({
      firstname: new FormControl(null, {
        validators: [Validators.required]
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      username: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      password_repeat: new FormControl(null, {
        validators: [Validators.required]
      }),
      country_selected: new FormControl("", {
        validators: [Validators.required]
      }),
      country_name: new FormControl(null, {
        validators: []
      }),
      flag: new FormControl(null, {
        validators: []
      }),
      type: new FormControl("", {
        validators: [Validators.required]
      })
    })
  }


  message: string = "";

  checkLowercase(str: string) {
    let total: number = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] >= 'a' && str[i] <= 'z') total++;
    }
    return total >= 3;
  }

  checkDigits(str: string) {
    let total: number = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] >= '0' && str[i] <= '9') total++;
    }
    return total >= 2;
  }

  specialCharacters = ['!', '@' ,'#', '$', '%', '^', '&', '*', '?', '+', '=', '.', '_', '-'];

  checkSpecialCharacters(str: string) {
    let total: number = 0;
    for (var i = 0; i < str.length; i++) {
      if (this.specialCharacters.indexOf(str[i]) > -1) total++;
    }
    return total >= 2;
  }

  checkForRepeat(startIndex, originalString, charToCheck) {
    var repeatCount = 1;
    for(var i = startIndex+1; i< originalString.length; i++) {
        if(originalString.charAt(i) == charToCheck) {
            repeatCount++;
        } else {
        return repeatCount;
        }   
    }
    return repeatCount;
}

  checkPassword(): boolean {
    let password = this.register_form.get('password').value;
    console.log(password);
    if (password.length < 8 || password.length > 12) return false;

    var passwordRegex = new RegExp('[A-Z]', 'g'); // min. 1 veliko slovo
    let test = passwordRegex.test(password);
    console.log("1 uppercase", test);
    if (test == false) return false;

    test = this.checkLowercase(password)
    console.log("3 lowercasecase", test);
    if (!test) return false;

    test = this.checkDigits(password);
    console.log("2 digits", test)
    if (!test) return false;

    test = this.checkSpecialCharacters(password);
    console.log("2 special characters", test);
    if (!test) return false;

    for (var i = 0; i < password.length; i++) {
      var numRepeats = this.checkForRepeat(i, password, password[i]);
      if (numRepeats > 3) return false;
    }
    return true;
  }

  register() {
    this.message = "";
    if (this.register_form.invalid ||
      (this.register_form.get('country_selected').value == 'other' && (!this.register_form.get('country_name').value ||
        (this.register_form.get('flag').value == undefined || !this.register_form.get('flag').value))
      )) {
      this.message = "All fields required!";
      return;
    }
    if (!this.checkPassword()) {
      this.message = "8-12 characters, 1 uppercase, 3 lowercase letters, 2 digits, 2 special characters, first character letter and no more then 2 same consecutive characters"
      return;
    }
    if (this.register_form.get('password').value !== this.register_form.get('password_repeat').value) {
      this.message = "Passwords dont't match!";
      return;
    }
    console.log(this.register_form);

    let country_name = this.register_form.get('country_selected').value;
    if (country_name == 'other') {
      country_name = this.register_form.get('country_name').value;
    }

    this.userService.register(
      this.register_form.get('firstname').value,
      this.register_form.get('lastname').value,
      this.register_form.get('email').value,
      this.register_form.get('username').value,
      this.register_form.get('password').value,
      country_name,
      this.register_form.get('flag').value,
      this.register_form.get('type').value,
    ).subscribe(res => {
      console.log(res);
      this.message = res.message;
    });
  }

  imageAdded(event: Event) {
    console.log("Flag added");
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    console.log(file);
    this.register_form.get('flag').patchValue(file);
  }

}
