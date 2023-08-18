// IMPORTED LIB-TYPES
import type { PageLoad } from './$types';
// IMPORTED TYPES
import type { Account, CourseClass } from '$types/index';
// IMPORTED UTILS
import { selectAccount, selectCourseClass } from '$utils/supabase';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ url }) => {
	try {
		const professor_id = url.searchParams.get('professor_id');
		const course_class_id = url.searchParams.get('course_class_id');
		if (!professor_id || !course_class_id) throw new Error();
		let courseClass: CourseClass;
		let professor: Account;
		await Promise.all([
			(courseClass = await selectCourseClass(course_class_id)),
			(professor = await selectAccount(professor_id)),
		]);
		if (!professor) throw new Error();
		return { courseClass, professor };
	} catch {
		throw redirect(300, '/app/dashboard');
	}
}) satisfies PageLoad;
