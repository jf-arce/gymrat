import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { useEffect, useState } from "react";
import { RoutinesService } from "../services/routines.service";
import { WorkoutsService } from "../services/workouts.service";
import { CurrentRoutine } from "../types/current-rutine.type";

export const useCurrentRoutineWorkouts = () => {
  const user = useAuthStore((state) => state.authSession.user);
  const [currentRoutine, setCurrentRoutine] = useState<CurrentRoutine | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchCurrentRoutine = async () => {
      try {
        const routines = await RoutinesService.findAllByUser(user.id);
        const currentRoutine = routines.find((routine) => routine.isCurrent);

        if (!currentRoutine) return;

        const routineWorkouts = await WorkoutsService.findAllByRoutine(
          currentRoutine.id,
        );

        if (routineWorkouts.length === 0) return;

        // Guardar la rutina actualizada en el estado
        setCurrentRoutine(
          new CurrentRoutine(
            routineWorkouts,
            currentRoutine.id,
            currentRoutine.name,
            currentRoutine.isCurrent,
            currentRoutine.nextWorkout,
            currentRoutine.user,
          ),
        );
      } catch (error) {
        console.error("Error fetching routine workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentRoutine();
  }, [user]);

  return { currentRoutine, loading };
};
