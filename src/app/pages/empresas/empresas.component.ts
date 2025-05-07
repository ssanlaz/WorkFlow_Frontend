import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Empresa } from '../../interfaces/empresa';
import { EmpresaService } from '../../services/empresa.service';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent {

empresas : Empresa[]= [];
private EmpSer = inject(EmpresaService);


ngOnInit():void{
  this.EmpSer.getEmpresas().subscribe({
    next: data =>{ this.empresas = data,
    console.log(this.empresas);
  },
    error : err => console.error('Error al cargar emoresas',err)
  });
 
}


  eliminarEmpresa(idEmpresa: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
      this.EmpSer.deleteEmpresa(idEmpresa).subscribe({
        next: res => {
          alert(res.mensaje);
          this.ngOnInit();
        },
        error: err => console.error('Error al eliminar empresa:', err)
      });
    }
  }
  
 


}
