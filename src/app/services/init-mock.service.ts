import { Injectable } from '@angular/core';
import { connect } from '@holochain/hc-web-client';
import { from, Observable } from 'rxjs';
import { HoloMockData } from '../models/holo-mock-data.model';

@Injectable({
  providedIn: 'root'
})
export class InitMockService {

  constructor() { }


  initHolo(holoMockData: HoloMockData) {
      connect("ws://localhost:8888").then(
        ({call, close}) => {
          call('test-instance/pos/main/init_mock_data')(holoMockData).then(data => {
            console.log(data)
          })
        }
      )
  }

  getProducts() {
    connect("ws://localhost:8888").then(
      ({call, close}) => {
        call('test-instance/pos/main/get_products')({product: {name: "", description: "", price: 0}}).then(data => {
          console.log(data)
        })
      }
    )
  }

  getBaskets() {
    connect("ws://localhost:8888").then(
      ({call, close}) => {
        call('test-instance/pos/main/get_basket')({basket_addr: "QmX4c5avps4AoXNaQb3yqJuWs7mL82CMXShp6Exe6H9rET"}).then(data => {
          console.log(data)
        })
      }
    )
  }
}
