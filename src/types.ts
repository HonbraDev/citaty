export interface Quote1 {
  text: string;
  author: string;
  year: number;
}

export type QuoteWithId = Quote1 & { id: string };

export interface Person {
  id: string; // UUID
  schoolEmail: string;
  legalName: string;
  type: PersonType["id"];
  active: boolean;
  discordId?: string;
  phoneNumber?: string;
  joinedDiscordServer: boolean;
  minecraftId?: string; // UUID
  discordNickPrefix?: string;
  discordNickname?: string;
}

export type PersonType =
  | {
      id: "student";
      label: "Student";
    }
  | {
      id: "teacher";
      label: "Učitel";
    }
  | {
      id: string;
      label: string;
    };

export interface Quote {
  id: string; // UUID
  year: number;
  createdAt: string; // 2021-10-11T12:14:55
  person: Person;
  text: string;
}

export interface QuoteTableType {
  id: string; // UUID
  year: number;
  createdAt: string;
  text: string;
  person: string; // UUID
}
