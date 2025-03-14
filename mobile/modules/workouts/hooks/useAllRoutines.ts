import { useEffect, useState } from "react";
import { Routine } from "../types/routines";
import { RoutinesService } from "../services/routines.service";

export const useAllRoutines = (userId: string | undefined) => {
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    if (!userId) return;
    RoutinesService.findAllByUser(userId).then((routines) => {
      setRoutines(routines);
    });
  }, []);

  return { routines };
};
