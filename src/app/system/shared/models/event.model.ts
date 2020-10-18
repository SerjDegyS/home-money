export class DegysEvent {
    constructor(
        public type: string,
        public amount: number,
        public categoryId: number,
        public date: string,
        public description: string,
        public id?: string,
        public catName?: string
    ) {}
}
