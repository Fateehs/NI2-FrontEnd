import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.components';
import { Create_User } from 'src/app/contracts/operation-result/create_user_result';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: CustomToastrService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  registerFormGroup: FormGroup;
  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        steamId: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let password = group.get('password').value;
          let confirmPassword = group.get('confirmPassword').value;
          return password === confirmPassword ? null : { notSame: true };
        },
      }
    );
  }

  get component() {
    return this.registerFormGroup.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.showSpinner(SpinnerType.BallBeat);
    this.submitted = true;

    if (this.registerFormGroup.invalid) return;

    const result: Create_User = await this.userService.create(user);
    if (result.succeeded) {
      this.toastrService.message(result.message, 'Account Created', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });
    } else {
      this.toastrService.message(result.message, 'Something is wrong', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    }

    this.hideSpinner(SpinnerType.BallBeat);
  }
}
