import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  numberOfItemsOnOrder$: Observable<number>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private orderService: OrderService) {}

    ngOnInit(): void {
      this.numberOfItemsOnOrder$ = this.orderService.getTotalNumberOfItemsOnOrder();
    }

    viewOrder() {
      console.log(this.orderService.getOrder())
    }

}
