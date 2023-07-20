
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};
export type TaskStateType = {
    [key: string]: Array<TaskType>
  };

  // declare module '@mui/material/styles' {
  //   interface Theme {
  //     status: {
  //       danger: React.CSSProperties['color'];
  //     };
  //   }
  
  //   interface ThemeOptions {
  //     status: {
  //       danger: React.CSSProperties['color'];
  //     };
  //   }
  
  //   interface Palette {
  //     neutral: Palette['primary'];
  //   }
  
  //   interface PaletteOptions {
  //     neutral: PaletteOptions['primary'];
  //   }
  
  //   interface PaletteColor {
  //     darker?: string;
  //   }
  
  //   interface SimplePaletteColorOptions {
  //     darker?: string;
  //   }
  // }