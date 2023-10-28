import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from '@/components/ui/button.tsx';
import { useForm } from "react-hook-form";
import { SignInValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader.tsx";

import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext.tsx";


const SignInForm = () => {
    const { toast } = useToast();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const navigate = useNavigate();

    // form definition
    const form = useForm<z.infer<typeof SignInValidation>>({
        resolver: zodResolver(SignInValidation),
            defaultValues: {
                email: '',
                password: '',
        },
    })

    const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount()

    async function onSubmit(values: z.infer<typeof SignInValidation>) {
        try {
            const session = await signInAccount({
                email: values.email,
                password: values.password,
            })

            if (!session) {
                toast({
                    title: "Something went wrong. Please login your new account"
                })

                navigate('/sign-in')

                return;
            }

            const isLoggedIn = await checkAuthUser();

            if (isLoggedIn) {
                form.reset();
                navigate('/')

            } else {
                return toast({
                    title: "Login failed. Please try again"
                })
            }

        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="logo" />

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    Welcome back, please enter your account details
                </p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField control={form.control} name="email" render={({ field }) =>
                        (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="password" render={({ field }) =>
                        (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {isUserLoading ? (
                            <div className="flex-center gap-2">
                                <Loader /> Loading
                            </div>
                        ) : "Sign Up"}
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Don't have an account?
                        <Link to='/sign-up' className="text-primary-500 text-small-semibold ml-1">Sign Up</Link>
                    </p>
                </form>
            </div>
        </Form>
    );
}

export default SignInForm;