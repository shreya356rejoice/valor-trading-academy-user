import { getCookie } from "../../../cookie";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
export const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return getCookie('token');
    }
    return null;
};

export const getCourses = async ({
  page = 1,
  limit = 10,
  searchQuery = "",
  courseType = "",
}) => {
  try {
    const token = getAuthToken();

    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["x-auth-token"] = token;
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (searchQuery) {
      params.append("search", searchQuery); 
    }
    if (courseType) {
      params.append("courseType", courseType);
    }

    const response = await fetch(
      `${BASEURL}/course/getAllCourse?${params.toString()}`,
      { method: "GET", headers }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching courses", error);
    throw error;
  }
};


export const getChapters = async (id) => {
    try {
        const token = getAuthToken();
        const headers = {};

        if (token) {
            headers['x-auth-token'] = token;
        }

        const res = await fetch(`${BASEURL}/chapter/getAllChapter?courseId=${id}&sortBy=chapterNo&sortOrder=1`, { headers });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching chapters", error);
        throw error;
    }
};