import {InitialApplicant } from '../make-payment/Models/PendingPayment'

export interface NextSequence{
    id : number,
    initialApplicant : InitialApplicant,
    sequence : Sequence
}

export interface Sequence {
    id : number,
    description : string
}