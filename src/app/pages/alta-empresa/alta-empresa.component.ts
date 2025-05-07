import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alta-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alta-empresa.component.html',
  styleUrl: './alta-empresa.component.css'
})
export class AltaEmpresaComponent {

  formulario!: FormGroup;
  idEmpresa: number | null = null;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}


  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombreEmpresa: ['', Validators.required],
      cif: ['', Validators.required],
      direccionFiscal: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    //Si queremos editar los campos de la empresa
    this.route.paramMap.subscribe(params => {
      const id = params.get('idEmpresa');
      console.log('ID recibido por ruta:', id);

    if (id) {
      this.idEmpresa = +id;
      this.empresaService.getEmpresaById(this.idEmpresa).subscribe({
        next: (empresa) => {
          console.log('Empresa cargada:', empresa);
          this.formulario.patchValue({
            nombreEmpresa: empresa.nombreEmpresa,
            cif: empresa.cif,
            direccionFiscal: empresa.direccionFiscal,
            pais: empresa.pais,
            ciudad: empresa.ciudad,
            email: (empresa as any).usuario?.email  
          });
        },
        error: (err) => console.error('Error al cargar empresa', err)
      });
    }
  });
  } 


registrarEmpresa(): void {
const empresaBase = {
      nombreEmpresa: this.formulario.value.nombreEmpresa,
      cif: this.formulario.value.cif,
      direccionFiscal: this.formulario.value.direccionFiscal,
      pais: this.formulario.value.pais,
      ciudad: this.formulario.value.ciudad,
      email: this.formulario.value.email
    };

    const registroDto = {
      email: this.formulario.value.email,
      password: this.formulario.value.password
    };

    //Si es editar la empresa
    if (this.idEmpresa) {
      delete registroDto.password;

      const empresaDto = {...empresaBase, idEmpresa: this.idEmpresa};
      delete registroDto.password;
      this.empresaService.updateEmpresa(this.idEmpresa, empresaDto).subscribe({
        next: () => {
          alert('Empresa actualizada correctamente');
          this.router.navigate(['/empresas']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar la empresa');
        }
      });
    }else{
    this.empresaService.createEmpresa({ empresaDto: empresaBase, registroDto }).subscribe({
      next: (res) => {
        alert(res.mensaje || 'Empresa registrada con existo');
        this.router.navigate(['/empresas'])
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar empresa');
      }
    })
}
}




}
