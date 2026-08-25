export type Player =
  | "player1"
  | "player2"
  | "player3"
  | "player4"
  | "player5"
  | "player6";

export interface PositionOffset {
  x: number;
  y: number;
}

export interface BaseTerritory {
  id: string;
  name: string;
  neighbors: string[];
  offset?: PositionOffset;
}

export interface Territory extends BaseTerritory {
  owner: Player;
  dice: number;
}
