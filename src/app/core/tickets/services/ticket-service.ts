import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);
  private API_URL = environment.API_URL;

  getTickets(): Observable<Ticket[]> {
   return this.http.get<Ticket[]>(`${this.API_URL}/tickets`) 
  }
}
