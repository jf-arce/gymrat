// import { create } from "zustand";
// import { CurrentRoutine } from "../types/current-rutine.type";
// import { WorkoutsService } from "../services/workouts.service";
// import { RoutinesService } from "../services/routines.service";

// interface CurrentRoutineStore {
//   currentRoutine: CurrentRoutine | null;
//   loading: boolean;
//   fetchCurrentRoutine: (userId: string) => void;
// }

// export const currentRoutineStore = create<CurrentRoutineStore>()((set) => ({
//   currentRoutine: null,
//   loading: false,

//   fetchCurrentRoutine: async (userId: string) => {
//     try {
//       set({ loading: true });

//       const routines = await RoutinesService.findAllByUser(userId);
//       const currentRoutine = routines.find((routine) => routine.isCurrent);

//       if (!currentRoutine) return;

//       const routineWorkouts = await WorkoutsService.findAllByRoutine(
//         currentRoutine.id,
//       );

//       if (routineWorkouts.length === 0) return;

//       // Guardar la rutina actualizada en el estado
//       set(
//         new CurrentRoutine(
//           routineWorkouts,
//           currentRoutine.id,
//           currentRoutine.name,
//           currentRoutine.isCurrent,
//           currentRoutine.nextWorkout,
//           currentRoutine.user,
//         ),
//       );
//     } catch (error) {
//       console.error("Error fetching routine workouts:", error);
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));
