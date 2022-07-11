import {useState} from "react";
import {HttpMethod, BaseResponse} from "types";


const useFetch = <T extends BaseResponse>() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<T | null>(null);

    const makeRequest = async <U extends BodyInit>(url: string, method: HttpMethod = HttpMethod.GET, requestBody?: U, headers?: HeadersInit): Promise<void> => {
        setIsLoading(true);
        const response = await fetch(url, {method, body:requestBody, headers});
        const data: T = await response.json();

        setIsLoading(false);
        if (!data.status) {
            setError("Unknown Server Error Occurred");
            return;
        }

        if (data.status !== "success") {
            setError(data.errorMessage || "Unknown Server Error Occurred");
            return;
        }
        if(error)
        {
            setError(undefined);
        }
        setData(data);
    }

    return {error, isLoading, data, makeRequest}
}

export {useFetch};