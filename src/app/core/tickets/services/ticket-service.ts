import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { CreateTicketRequest, Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);
  private API_URL = environment.API_URL;

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.API_URL}/tickets`)
  }

  createTicket(ticket: CreateTicketRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.API_URL}/tickets`, ticket)
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.API_URL}/tickets/${id}`)
  }

  updateTicket(id: string, changes: Partial<Ticket>): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.API_URL}/tickets/${id}`, changes)
  }

  deleteTicket(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/tickets/${id}`)
  }
}