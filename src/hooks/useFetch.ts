import {useState} from "react";
import {HttpMethod, BaseResponse} from "types";


const useFetch = <T extends BaseResponse>() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<T | null>(null);

    const makeRequest = async <U extends BodyInit>(url: string, method: HttpMethod = HttpMethod.GET, requestBody?: U, headers?: HeadersInit): Promise<void> => {
        setIsLoading(true);
        const response = await fetch(url, {method, body:requestBody, headers});

        console.log(response);

        const data: T = await response.json();

        const defaultErrorMessage = "Unknown Server Error Occurred";
        setIsLoading(false);
        if (!data.status) {
            setError(defaultErrorMessage);
            return;
        }

        if (data.status !== "success") {
            setError(data.errorMessage ?? defaultErrorMessage);
            return;
        }

        if(!response.ok)
        {
            setError(data.errorMessage ?? defaultErrorMessage)
            return;
        }

        setData(data);
    }

    return {error, isLoading, data, setError, makeRequest};
}

export {useFetch};