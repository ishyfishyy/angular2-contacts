export class Contact {
	id: number;
	username: string;
	email: string;
	avatarUrl: string = "http://www.asthmamd.org/images/icon_user_1.png";
	description: string;
	checked: boolean = false;

	constructor() {
	}
}